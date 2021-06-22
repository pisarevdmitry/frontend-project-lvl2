install:
	npm ci
publish:
	npm publish --dry-run
lint:
	npx eslint .
tests:
	NODE_OPTIONS=--experimental-vm-modules npm test	
tests-coverage:	
	NODE_OPTIONS=--experimental-vm-modules npm test -- --coverage --coverageProvider=v8
