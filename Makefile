install:
	npm ci

test:
	npm test

lint:
	npm run lint

lint:fix:
	npm run lint:fix

test:
	npm run test.

test-coverage:
	npm test -- --coverage

test-watch:
	npm run test -- --watch
