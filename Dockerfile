# Używamy Node 20 (stabilne środowisko)
FROM node:20

# Ustawiamy katalog roboczy
WORKDIR /app

# Kopiujemy pliki projektu
COPY . .

# Instalujemy zależności
RUN npm ci || npm install

# Budujemy aplikację (jeśli masz np. Reacta lub bundlera)
# RUN npm run build

# Instalujemy serwer statyczny do uruchamiania plików
RUN npm install -g serve

# Ustawiamy port i komendę startową
EXPOSE 3000
CMD ["serve", ".", "-l", "3000"]
