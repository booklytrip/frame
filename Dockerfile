FROM node:6.10

# Define ssh key
ARG SSH_KEY
RUN mkdir /root/.ssh
RUN chmod 700 /root/.ssh
RUN echo $SSH_KEY |  base64 -d > /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa
RUN echo "Host *\n\tStrictHostKeyChecking no\n\n" >> /root/.ssh/config
RUN export CI="true"

# Prepare app directory
RUN mkdir -p /opt/frame
ADD . /opt/frame

# Install yarn package manager
RUN curl -o- -L https://yarnpkg.com/install.sh | bash

# Install dependencies
WORKDIR /opt/frame

RUN ~/.yarn/bin/yarn install
RUN ~/.yarn/bin/yarn upgrade git+ssh://git@gitlab.com/bookly/UIKit.git

# Build the app
RUN ~/.yarn/bin/yarn run build

# Install pushstate server to serve files
RUN ~/.yarn/bin/yarn global add serve

# Expose the app port
EXPOSE 80

# Start the app
CMD serve -p 80 -s build
