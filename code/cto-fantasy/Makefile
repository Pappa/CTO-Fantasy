.PHONY: build clean deploy

build:
	npm run build

clean:
	rm -rf ./build

deploy: clean build
	sls client deploy --aws-profile serverless-agent --no-confirm
