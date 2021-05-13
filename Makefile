.PHONY: all dependencies deploy

all: dependencies

dependencies:
	npm i firebase-tools -g

deploy:
	firebase deploy

deploy-functions-only:
	firebase deploy --only functions
