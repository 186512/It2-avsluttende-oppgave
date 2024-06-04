# Folder structure

- `src` - source code for your kaboom project
- `www` - distribution folder, contains your index.html, built js bundle and static assets


## Development

```sh
$ npm run dev
```

will start a dev server at http://localhost:8000

## Distribution

```sh
$ npm run build
```

will build your js files into `www/main.js`

```
$ npm run bundle
```

will build your game and package into a .zip file, you can upload to your server or itch.io / newground etc.

## Om spillet
dette er et spill som handler hovedsakelig om å overleve. men scoren øker ikke ved å ungå "fienden". score økes ved å skyte et skudd mot fienden. 
 - kontrollere:
    W = fram
    A = venstre
    S = ned
    D = høyre
    Q = skyt skudd (man sikter med musepeker)
    SPACE = restart spill
    

## bugs
-dersom mange nok enemys samler seg vil de ikke kunne bevege seg riktig og vil sakte bevege seg ut av skjermen.

## problemer under skriving
 - var stuck i en stund på logiken for enemy. jeg fikk løst det med litte grann hjelp

## To-do
- for stor rect for "player". (gjøre den mindre) //ikke fisket
- skudd må fiskes (blir spawnet for lagt unna player (relatert til størelsen på rect))
- fiske UU // ikke fikset

## konklusjon
 - spillet ble ikke helt ferdig, det er en del UU-endringer som må gjøres.
 - det ferdige produktet ble nogelunde hva jeg så for meg.







