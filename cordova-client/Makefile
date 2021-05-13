.PHONY: dependencies build-android build-ios run-android run-ios clean

all: dependencies

dependencies:
	npm install
	npm run prepare

build-android:
	npm run build-android

run-android:
	npm run run-android

build-ios:
	npm run build-ios

run-ios:
	npm run run-ios

clean:
	rm -rf platforms plugins
