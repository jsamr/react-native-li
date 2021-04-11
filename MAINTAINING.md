jsamr's template for react-native libraries

## Creating a new package

1. Copy `packages/example-path` to the new package;
2. Create a new workflow from `.github/workflows/example-path.yml`. The name of
   the workflow must match the name of the folder for that package in
   `packages/` directory.
3. Add a new entry + flag in `codecov.yml`. The flag must match the name of the
   package in `packages/` directory.
4. In the new package folder, go to the `README.md`, `example-path` and `package.json` and do:
  * Replace any instance of `example-project` with the github path;
  * Replace any instance of `example-npm` with the npm package name.
  * Replace any instance of `example-path` with the folder name hosting the
    package in `packages` directory.
5. In the new package folder, go to the `package.json`
  * Fill the `description`
  * Fill the `keywords`
6. Repeat the steps from point 4. to the new workflow file you created in step 2.

## Upgrading expo

Run

```bash
yarn demo expo upgrade
```

After that step, go to the root `package.json` and in the `resolutions` field, update any dependency used by the demo.
