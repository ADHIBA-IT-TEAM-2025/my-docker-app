pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = 'sanjeev26082002'
        DOCKER_HUB_PASS = 'Sanju@02/'
        BACKEND_IMAGE = 'sanjeev26082002/backend'
        FRONTEND_IMAGE = 'sanjeev26082002/frontend'
        BACKEND_CONTAINER = 'backend'
        FRONTEND_CONTAINER = 'frontend'
    }

    stages {

        stage('Build Backend') {
            agent { docker { image 'node:18-alpine' } }
            steps {
                dir('backend') {
                    sh 'npm install'
                    sh 'npm run build || echo "No build script for backend"'
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
        script {
            def GIT_COMMIT_SHORT = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
            sh "docker build -t ${DOCKER_HUB_USER}/backend:${GIT_COMMIT_SHORT} -f ./backend/Dockerfile.backend ./backend"
            sh "docker build -t ${DOCKER_HUB_USER}/frontend:${GIT_COMMIT_SHORT} -f ./frontend/Dockerfile.frontend ./frontend"
        }
    }
}

        stage('Push to Docker Hub') {
            steps {
                sh """
                    echo "$DOCKER_HUB_PASS" | docker login -u "$DOCKER_HUB_USER" --password-stdin
                    docker push ${BACKEND_IMAGE}
                    docker push ${FRONTEND_IMAGE}
                """
            }
        }

        stage('Deploy Zero-Downtime') {
            steps {
                sh """
                    # Pull latest images
                    docker pull ${BACKEND_IMAGE}
                    docker pull ${FRONTEND_IMAGE}

                    # Run new containers on temp ports
                    docker run -d -p 5001:5000 --name ${BACKEND_CONTAINER}_new ${BACKEND_IMAGE}
                    docker run -d -p 3001:3000 --name ${FRONTEND_CONTAINER}_new ${FRONTEND_IMAGE}

                    # Give them a few seconds to start
                    sleep 5

                    # Stop old containers
                    docker stop ${BACKEND_CONTAINER} || true
                    docker stop ${FRONTEND_CONTAINER} || true

                    # Remove old containers
                    docker rm ${BACKEND_CONTAINER} || true
                    docker rm ${FRONTEND_CONTAINER} || true

                    # Rename new containers to main names
                    docker rename ${BACKEND_CONTAINER}_new ${BACKEND_CONTAINER}
                    docker rename ${FRONTEND_CONTAINER}_new ${FRONTEND_CONTAINER}
                """
            }
        }
    }

    post {
        failure {
            echo "❌ Build or deploy failed!"
        }
        success {
            echo "✅ Build and deploy succeeded!"
        }
    }
}
