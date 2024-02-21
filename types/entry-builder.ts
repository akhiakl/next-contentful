import { Project, ScriptTarget, SyntaxKind } from "ts-morph";

const project = new Project({
  compilerOptions: {
    target: ScriptTarget.ES5,
    declaration: true,
  },
});
project.addSourceFilesAtPaths("./*.ts");
const sourceFiles = project.getSourceFiles();
const typerFile = project.createSourceFile("typer.ts", undefined, {
  overwrite: true,
});
// typerFile.addEnum({
//   name: "Name",
//   isExported: true,
//   members: [
//     {
//       name: "A",
//     },
//   ],
// });

(function execute() {
  const typeImports: Array<{ name: string; contentType: string }> = [];
  for (const sourceFile of sourceFiles) {
    if (sourceFile.getBaseNameWithoutExtension() === "index") continue;
    const skeletonTypeDeclaration = sourceFile.getTypeAlias((declaration) =>
      /\S\Skeleton$/.test(declaration.getName()),
    );
    const entryTypeDeclaration = sourceFile.getTypeAlias(
      (declaration) => !/\S\Skeleton$/.test(declaration.getName()),
    );
    const tyepArguments = skeletonTypeDeclaration
      ?.getTypeNode()
      ?.asKind(SyntaxKind.TypeReference)
      ?.getTypeArguments();
    const idArgument = tyepArguments?.[1];
    if (entryTypeDeclaration != null && idArgument != null)
      typeImports.push({
        name: entryTypeDeclaration.getName(),
        contentType: idArgument.getText(),
      });
  }
  typerFile.addImportDeclaration({
    isTypeOnly: true,
    namedImports: ["ChainModifiers", "LocaleCode"],
    moduleSpecifier: `contentful`,
  });
  typerFile.addImportDeclaration({
    isTypeOnly: true,
    namedImports: typeImports.map((typeImports) => typeImports.name),
    moduleSpecifier: `./index`,
  });
  typerFile.addTypeAlias({
    name: "ContentEntry",
    isExported: true,
    typeParameters: [
      {
        name: "Id",
        constraint: "string",
      },
      {
        name: "Modifiers",
        constraint: "ChainModifiers",
      },
      {
        name: "Locales",
        constraint: "LocaleCode",
      },
    ],
    type: (writer) => {
      for (const typeImport of typeImports) {
        writer.writeLine(
          `Id extends ${typeImport.contentType} ? ${typeImport.name}<Modifiers, Locales>:`,
        );
      }
      writer.writeLine("never");
    },
  });
  typerFile.saveSync();
})();
