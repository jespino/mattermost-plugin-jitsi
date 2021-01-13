# Contributing to Mattermost Jitsi Plugin

Thank you for your interest in contributing! Join the [**Plugin: Jitsi**](https://community-daily.mattermost.com/core/channels/plugin-jitsi) channel on the Mattermost community server for discussion about this plugin.

## Reporting issues

If you think you found a bug, [please use the GitHub issue tracker](https://github.com/mattermost/mattermost-plugin-jitsi/issues/new?template=issue.md) to open an issue. To help us troubleshoot the issue, please provide the required information in the issue template.

## Translating strings

Mattermost Jitsi Plugin supports localization to various languages. We as maintainers rely on contributors to help with the translations.

The plugin uses [go-i18n](https://github.com/nicksnyder/go-i18n) as library and tool to manage translation. The CLI tool `goi18n` is required to manage translation. You can install it by running `env GO111MODULE=off go get -u github.com/nicksnyder/go-i18n/v2/goi18n`.

The localization process is defined below:
- During development, new translation strings may be added or existing ones updated.
- When a new version is planned to release soon, a repository maintainer opens an issue informing about the new release and mentions all translation maintainers in the issue.
- Translation maintainers submit PRs with new translations, which may get reviewed by other translators.
- After all translation PRs are merged, the new version is released. If a translation PR is not submitted within a week, the release is cut without it.

### Translation maintainers

- French: [@Extazx2](https://github.com/Extazx2)
- German: [@hanzei](https://github.com/hanzei)
- Spanish: [@jespino](https://github.com/jespino)

### Translate to a new language

Note: We use the German locale (`de`) in this example. When translating to a new language, replace `de` in the following commands with the locale you want to translate. [See available locales](https://github.com/mattermost/mattermost-server/tree/master/i18n).

1. Create a translation file:

   `touch asserts/i18n/translate.de.json`

2. Merge all current messages into your translation file:

   `make i18n-extract-server`

3. Translate all messages in `asserts/i18n/translate.de.json`.

4. Merge the translated messages into the active message files:

   `make i18n-merge-server`

5. Add your language to the list of [supported languages](https://github.com/mattermost/mattermost-plugin-jitsi#localization) in `README.md` and add yourself to the list of [translation maintainers](#translation-maintainers) in `CONTRIBUTING.md`.

6. [Submit a PR](https://github.com/mattermost/mattermost-plugin-jitsi/compare) with these files.

Once you've submitted a PR, your changes will be reviewed. Big thank you for your contribution!

### Translate existing languages

1. Ensure all translation messages are correctly extracted:

   `make i18n-extract-server`

2. Translate all messages in `asserts/i18n/translate.*.json` for the languages you are comfortable with.

3. Merge the translated messages into the active message files:

   `make i18n-merge-server`

4. Commit **only the language files you edited** and [submit a PR](https://github.com/mattermost/mattermost-plugin-jitsi/compare).

## Submitting bug fixes or features

We have [open help wanted issues](https://github.com/mattermost/mattermost-plugin-jitsi/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3A%22Help+Wanted%22) we are looking for help.

If you are contributing a feature, [please open a feature request](https://github.com/mattermost/mattermost-plugin-jitsi/issues/new?template=issue.md) first. This enables the feature to be discussed and fully specified before you start working on it. Small code changes can be submitted without opening an issue.

Note that this project uses [Go modules](https://github.com/golang/go/wiki/Modules). Be sure to locate the project outside of `$GOPATH`, or allow the use of Go modules within your `$GOPATH` with an `export GO111MODULE=on`.

## Development

This plugin contains both a server and webapp portion.

* Use `makedist` to build distributions of the plugin that you can upload to a Mattermost server.
* Use `make test` to run tests of the plugin.
* Use `make check-style` to check the style.
* Use `make deploy` to deploy the plugin to your Mattermost server. Before running make deploy you need to set a few environment variables:

```sh
export MM_SERVICESETTINGS_SITEURL=http://localhost:8065
export MM_ADMIN_USERNAME=admin
export MM_ADMIN_PASSWORD=password
```

* Use `make help` to know all useful targets for devleopment
