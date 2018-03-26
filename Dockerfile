FROM alpine:latest

MAINTAINER kevin.marilleau@gmail.com

# INSTALL GIT
RUN apk --update add git openssh

# INSTALL YARN
RUN apk --update add nodejs

# CLEAN DOCKER IMAGE
RUN rm -rf /var/lib/apt/lists/* && \
    rm /var/cache/apk/*

# CLONE GIT REPO
RUN git clone https://github.com/daimebag/TicTacToe.git

WORKDIR /TicTacToe

# INSTALL DEPENDENCIES AND BUILD APP
RUN npm install    && \
    npm run build

    # CLEAN UP
RUN rm -rf .git .gitignore README.md LICENSE \
            Dockerfile docker-compose.yml \
            node_modules src webpack.config webpack.config.js \
            package-lock.json package.json yarn.lock

VOLUME /TicTacToe/dist

CMD ["/bin/sh"]