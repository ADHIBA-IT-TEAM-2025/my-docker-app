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

        stage('Build & Push Docker Images') {
            steps {
                script {
                    def GIT_COMMIT_SHORT = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()

                    // Build backend
                    dir('backend') {
                        docker.image('node:18-alpine').inside {
                            sh 'npm install'
                            sh 'npm run build || echo "No backend build script"'
                        }
                    }
                    sh "docker build -t ${BACKEND_IMAGE}:${GIT_COMMIT_SHORT} -f ./backend/Dockerfile.backend ./backend"

                    // Build frontend
                    dir('frontend') {
                        docker.image('node:20').inside {
                            sh 'npm install'
                            sh 'npm run build'
                        }
                    }
                    sh "docker build -t ${FRONTEND_IMAGE}:${GIT_COMMIT_SHORT} -f ./frontend/Dockerfile.frontend ./frontend"

                    // Login and push
                    sh """
                        echo "$DOCKER_HUB_PASS" | docker login -u "$DOCKER_HUB_USER" --password-stdin
                        docker push ${BACKEND_IMAGE}:${GIT_COMMIT_SHORT}
                        docker push ${FRONTEND_IMAGE}:${GIT_COMMIT_SHORT}
                    """
                }
            }
        }

        stage('Zero-Downtime Deploy') {
            steps {
                script {
                    def GIT_COMMIT_SHORT = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                    sh """
                        docker pull ${BACKEND_IMAGE}:${GIT_COMMIT_SHORT}
                        docker pull ${FRONTEND_IMAGE}:${GIT_COMMIT_SHORT}

                        docker run -d -p 5001:5000 --name ${BACKEND_CONTAINER}_new ${BACKEND_IMAGE}:${GIT_COMMIT_SHORT}
                        docker run -d -p 3001:3000 --name ${FRONTEND_CONTAINER}_new ${FRONTEND_IMAGE}:${GIT_COMMIT_SHORT}

                        sleep 5

                        docker stop ${BACKEND_CONTAINER} || true
                        docker stop ${FRONTEND_CONTAINER} || true
                        docker rm ${BACKEND_CONTAINER} || true
                        docker rm ${FRONTEND_CONTAINER} || true

                        docker rename ${BACKEND_CONTAINER}_new ${BACKEND_CONTAINER}
                        docker rename ${FRONTEND_CONTAINER}_new ${FRONTEND_CONTAINER}
                    """
                }
            }
        }
    }

    post {
        failure { echo "❌ Build or deploy failed!" }
        success { echo "✅ Build and deploy succeeded!" }
    }
}
