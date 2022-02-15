npx create-react-app app --template redux-typescript
cd app
npm install \
	@typescript-eslint/eslint-plugin \
	@typescript-eslint/parser \
	@types/jsonwebtoken \
	eslint-config-prettier \
	eslint-plugin-jest \
	eslint-plugin-prettier \
	eslint-plugin-react \
	eslint-plugin-react-hooks \
	eslint-plugin-import \
	prettier \
	antd \
	axios \
	i18next react-i18next i18next-browser-languagedetector \
	react-router-dom \
	jsonwebtoken socket.io-client
cp ../files/.eslintrc.js ./
cp ../files/tsconfig.json ./
cd src
cp ../../files/src/App.route.tsx ./
cp ../../files/src/App.tsx ./
cp ../../files/src/index.tsx ./
cp -R ../../files/src/components ./components
cp -R ../../files/src/ducks ./ducks
cp -R ../../files/src/hooks ./hooks
cp -R ../../files/src/store ./store
cp -R ../../files/src/utils ./utils
cd ..
npx prettier --write src/**/*.ts{,x}
