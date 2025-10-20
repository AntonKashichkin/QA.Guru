# Указываеи операционную систему
FROM mcr.microsoft.com/playwright:v1.56.0-noble

# Копируем тесты
COPY . .

# Ставим библиотеки
 RUN npm i
 RUN npx playwright install --with-deps

 CMD ["npm", "run", "test"]
