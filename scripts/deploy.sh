#!/bin/bash

# BigByte Deployment Script
set -e

# Configuration
AWS_REGION="us-east-1"
ECR_REPOSITORY="bigbyte-frontend"
ECS_CLUSTER="bigbyte-cluster"
ECS_SERVICE="bigbyte-service"
ENVIRONMENT=${1:-production}

echo "🚀 Starting BigByte deployment for $ENVIRONMENT environment..."

# Check AWS CLI
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI not found. Please install it first."
    exit 1
fi

# Check Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found. Please install it first."
    exit 1
fi

# Login to ECR
echo "🔐 Logging into Amazon ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $(aws sts get-caller-identity --query Account --output text).dkr.ecr.$AWS_REGION.amazonaws.com

# Build and tag Docker image
echo "🔨 Building Docker image..."
IMAGE_TAG=$(git rev-parse --short HEAD)
REGISTRY_URI=$(aws sts get-caller-identity --query Account --output text).dkr.ecr.$AWS_REGION.amazonaws.com
IMAGE_URI=$REGISTRY_URI/$ECR_REPOSITORY:$IMAGE_TAG

docker build -t $ECR_REPOSITORY:$IMAGE_TAG .
docker tag $ECR_REPOSITORY:$IMAGE_TAG $IMAGE_URI

# Push to ECR
echo "📤 Pushing image to ECR..."
docker push $IMAGE_URI

# Update ECS service
echo "🔄 Updating ECS service..."
TASK_DEFINITION=$(aws ecs describe-task-definition --task-definition bigbyte-frontend --query taskDefinition)

# Create new task definition with updated image
NEW_TASK_DEFINITION=$(echo $TASK_DEFINITION | jq --arg IMAGE "$IMAGE_URI" '.containerDefinitions[0].image = $IMAGE | del(.taskDefinitionArn) | del(.revision) | del(.status) | del(.requiresAttributes) | del(.placementConstraints) | del(.compatibilities) | del(.registeredAt) | del(.registeredBy)')

NEW_TASK_INFO=$(aws ecs register-task-definition --cli-input-json "$NEW_TASK_DEFINITION")
NEW_REVISION=$(echo $NEW_TASK_INFO | jq '.taskDefinition.revision')

# Update service
aws ecs update-service --cluster $ECS_CLUSTER --service $ECS_SERVICE --task-definition bigbyte-frontend:$NEW_REVISION

# Wait for deployment
echo "⏳ Waiting for deployment to complete..."
aws ecs wait services-stable --cluster $ECS_CLUSTER --services $ECS_SERVICE

echo "✅ Deployment completed successfully!"
echo "🌐 Your application is now live!"

# Get load balancer URL
ALB_DNS=$(aws elbv2 describe-load-balancers --names $ENVIRONMENT-bigbyte-alb --query 'LoadBalancers[0].DNSName' --output text 2>/dev/null || echo "ALB not found")
if [ "$ALB_DNS" != "ALB not found" ]; then
    echo "🔗 Application URL: http://$ALB_DNS"
fi

echo "🎉 BigByte deployment completed!"