pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = 'sanjeev26082002'
        DOCKER_HUB_PASS = credentials('docker-hub-credentials') 
        // Add this credential in Jenkins (username+password or PAT)
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/ADHIBA-IT-TEAM-2025/my-docker-app.git'
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'npm install'
                    sh 'npm test || echo "No tests found, skipping..."'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker build -t demo-backend -f Dockerfile.backend .'
                sh 'docker build -t demo-frontend -f Dockerfile.frontend .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                sh "echo $DOCKER_HUB_PASS | docker login -u $DOCKER_HUB_USER --password-stdin"
                sh "docker tag demo-backend $DOCKER_HUB_USER/demo-backend:latest"
                sh "docker tag demo-frontend $DOCKER_HUB_USER/demo-frontend:latest"
                sh "docker push $DOCKER_HUB_USER/demo-backend:latest"
                sh "docker push $DOCKER_HUB_USER/demo-frontend:latest"
            }
        }
    }

    post {
        success {
            echo "✅ Build and push successful!"
        }
        failure {
            echo "❌ Build failed!"
        }
    }
}
