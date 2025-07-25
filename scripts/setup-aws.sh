#!/bin/bash

# BigByte AWS Infrastructure Setup Script
set -e

ENVIRONMENT=${1:-production}
AWS_REGION=${2:-us-east-1}
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

echo "🏗️  Setting up BigByte infrastructure for $ENVIRONMENT environment in $AWS_REGION..."

# CloudFormation stack
echo "📋 Creating CloudFormation stack..."
aws cloudformation deploy \
  --template-file .aws/cloudformation/infrastructure.yml \
  --stack-name $ENVIRONMENT-bigbyte-infrastructure \
  --parameter-overrides Environment=$ENVIRONMENT \
  --capabilities CAPABILITY_IAM \
  --region $AWS_REGION

echo "⏳ Waiting for stack creation to complete..."
aws cloudformation wait stack-create-complete \
  --stack-name $ENVIRONMENT-bigbyte-infrastructure \
  --region $AWS_REGION

# Get stack outputs
VPC_ID=$(aws cloudformation describe-stacks \
  --stack-name $ENVIRONMENT-bigbyte-infrastructure \
  --query 'Stacks[0].Outputs[?OutputKey==`VPCId`].OutputValue' \
  --output text \
  --region $AWS_REGION)

ECR_URI=$(aws cloudformation describe-stacks \
  --stack-name $ENVIRONMENT-bigbyte-infrastructure \
  --query 'Stacks[0].Outputs[?OutputKey==`ECRRepositoryURI`].OutputValue' \
  --output text \
  --region $AWS_REGION)

ALB_DNS=$(aws cloudformation describe-stacks \
  --stack-name $ENVIRONMENT-bigbyte-infrastructure \
  --query 'Stacks[0].Outputs[?OutputKey==`LoadBalancerDNS`].OutputValue' \
  --output text \
  --region $AWS_REGION)

# Create ECS Task Execution Role
echo "🔑 Creating ECS roles..."
aws iam create-role \
  --role-name ecsTaskExecutionRole \
  --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "Service": "ecs-tasks.amazonaws.com"
        },
        "Action": "sts:AssumeRole"
      }
    ]
  }' || echo "Role already exists"

aws iam attach-role-policy \
  --role-name ecsTaskExecutionRole \
  --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy || echo "Policy already attached"

# Create Target Group
echo "🎯 Creating target group..."
TARGET_GROUP_ARN=$(aws elbv2 create-target-group \
  --name $ENVIRONMENT-bigbyte-tg \
  --protocol HTTP \
  --port 80 \
  --vpc-id $VPC_ID \
  --health-check-path /health \
  --health-check-interval-seconds 30 \
  --health-check-timeout-seconds 5 \
  --healthy-threshold-count 2 \
  --unhealthy-threshold-count 5 \
  --query 'TargetGroups[0].TargetGroupArn' \
  --output text 2>/dev/null || \
  aws elbv2 describe-target-groups \
    --names $ENVIRONMENT-bigbyte-tg \
    --query 'TargetGroups[0].TargetGroupArn' \
    --output text)

# Create Load Balancer Listener
echo "👂 Creating load balancer listener..."
ALB_ARN=$(aws elbv2 describe-load-balancers \
  --names $ENVIRONMENT-bigbyte-alb \
  --query 'LoadBalancers[0].LoadBalancerArn' \
  --output text)

aws elbv2 create-listener \
  --load-balancer-arn $ALB_ARN \
  --protocol HTTP \
  --port 80 \
  --default-actions Type=forward,TargetGroupArn=$TARGET_GROUP_ARN || echo "Listener might already exist"

# Update task definition with correct values
echo "📝 Updating task definition..."
sed -i "s/YOUR_ACCOUNT_ID/$ACCOUNT_ID/g" .aws/task-definition.json

# Create CloudWatch Log Group
echo "📊 Creating CloudWatch log group..."
aws logs create-log-group \
  --log-group-name /ecs/bigbyte-frontend \
  --region $AWS_REGION || echo "Log group already exists"

# Register task definition
echo "📋 Registering ECS task definition..."
aws ecs register-task-definition \
  --cli-input-json file://.aws/task-definition.json \
  --region $AWS_REGION

# Create ECS Service
echo "🔄 Creating ECS service..."
SUBNETS=$(aws ec2 describe-subnets \
  --filters "Name=vpc-id,Values=$VPC_ID" "Name=tag:Name,Values=*private*" \
  --query 'Subnets[*].SubnetId' \
  --output text | tr '\t' ',')

SECURITY_GROUP=$(aws ec2 describe-security-groups \
  --filters "Name=vpc-id,Values=$VPC_ID" "Name=group-name,Values=$ENVIRONMENT-bigbyte-ecs-sg" \
  --query 'SecurityGroups[0].GroupId' \
  --output text)

aws ecs create-service \
  --cluster $ENVIRONMENT-bigbyte-cluster \
  --service-name bigbyte-service \
  --task-definition bigbyte-frontend \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[$SUBNETS],securityGroups=[$SECURITY_GROUP],assignPublicIp=DISABLED}" \
  --load-balancers targetGroupArn=$TARGET_GROUP_ARN,containerName=bigbyte-frontend,containerPort=80 \
  --region $AWS_REGION || echo "Service might already exist"

echo "✅ AWS infrastructure setup completed!"
echo "📊 Summary:"
echo "  VPC ID: $VPC_ID"
echo "  ECR Repository: $ECR_URI"
echo "  Load Balancer: $ALB_DNS"
echo "🌐 Your application will be available at: http://$ALB_DNS"
echo ""
echo "Next steps:"
echo "1. Run: chmod +x scripts/deploy.sh"
echo "2. Run: ./scripts/deploy.sh $ENVIRONMENT"
echo "3. Set up your GitHub secrets for CI/CD"
