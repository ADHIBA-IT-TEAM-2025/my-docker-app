pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = 'sanjeev26082002'
        DOCKER_HUB_PASS = 'Sanju@02/'
    }

    stages {

       stage('Build Backend') {
    agent { docker { image 'node:18-alpine' } }
    steps {
        dir('backend') {
            sh 'npm install'
        }
    }
}


        stage('Build Frontend') {
            agent { docker { image 'node:18-alpine' } }
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker build -t sanjeev26082002/backend -f ./backend/Dockerfile.backend ./backend'
                sh 'docker build -t sanjeev26082002/frontend -f ./frontend/Dockerfile.frontend ./frontend'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                sh '''
                    echo "$DOCKER_HUB_PASS" | docker login -u "$DOCKER_HUB_USER" --password-stdin
                    docker push sanjeev26082002/backend
                    docker push sanjeev26082002/frontend
                '''
            }
        }

        stage('Deploy Containers') {
            steps {
                sh '''
                    # Stop and remove old containers if they exist
                    docker stop frontend-container || true
                    docker rm frontend-container || true
                    docker stop backend-container || true
                    docker rm backend-container || true

                    # Run new containers
                    docker run -d -p 3000:3000 --name frontend-container sanjeev26082002/frontend
                    docker run -d -p 5000:5000 --name backend-container sanjeev26082002/backend
                '''
            }
        }
    }

    post {
        failure {
            echo "❌ Build failed!"
        }
        success {
            echo "✅ Build succeeded!"
        }
    }
}
