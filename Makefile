install:
	npm ci

dev:
	npm run dev

build-dev:
	npm run build

build-prod:
	npm run prod

lint:
	npm run lint

lint-fix:
	npm run lint:fix

test:
	npm run test .

test-coverage:
	npm test -- --coverage

test-watch:
	npm run test -- --watch
