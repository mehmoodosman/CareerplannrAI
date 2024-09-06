## Troubleshooting


Error: Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.
Learn more: https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor

Solution: Update next by running this command on your terminal: 
```bash npx @next/codemod new-link .```

Error: Hard reset of the main branch. If you want to completely replace your local main branch
with the remote main branch
```bash
git checkout main
git reset --hard origin/main
```

Error: PDFLoader cannot be found, run this command on your terminal:
```npm i @langchain/community pdf-parse```

Error: Next issue. Update  Next by running this command on your terminal
```npm i next@latest react@latest react-dom@latest eslint-config-next@latest```