install:
		npm ci

publish:
		npm publish --dry-run
lint:
		npx eslint .
tests:
	NODE_OPTIONS=--experimental-vm-modules npx jest	--bail	
tests-coverage:	
	make tests --  --coverage --coverageProvider=v8
