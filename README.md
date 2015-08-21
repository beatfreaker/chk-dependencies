# chk-dependencies

> Check which dependencies are installed and which are not from the one specified in package.json

## Install

```
$ npm install --global chk-dependencies
```

## Use

```
$ cd git-project
$ chk-dependencies
┌─────────────┬─────────┐
│ Module Name │ Status  │
├─────────────┼─────────┤
│ chalk       │ Present │
├─────────────┼─────────┤
│ cli-table   │ Present │
├─────────────┼─────────┤
│ fs          │ Present │
├─────────────┼─────────┤
│ q           │ Present │
└─────────────┴─────────┘
```

## License

[ISC](http://opensource.org/licenses/ISC)
