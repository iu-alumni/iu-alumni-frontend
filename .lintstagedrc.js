export default {
  '**/*.{ts,js}': ['eslint --fix'],
  '**/*.{vue,ts}': ['prettier --ignore-path .gitignore --write']
}
