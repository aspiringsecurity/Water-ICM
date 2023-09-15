# ICON DAO Tracker for Water Monitor solution

We are extending the ICON DAO tracker example for Water Monitor solution.


In order to add a reference to your DAO, you need to create a **pull request** with a `.json` file in the `assets/data/` folder. You need to specify these data:

```json
{
  "name": "My governance name",
  "link": "https://my.governance/",
  "logo": "https://my.logo/",
  "socials": {
    "discord": "https://discord.gg/_id",
    "github": "https://github.com/_id",
    "twitter": "https://twitter.com/_id",
    "telegram": "https://t.me/_id",
    "website": "https://my.website/"
  }
}
```

* The `name`, `link` and `logo` keys are **required**.
* `Discord`, `GitHub`, `Twitter` and `Telegram` are the only supported social media.
* You can also specify only the IDs:
```json
{
  "socials": {
    "discord": "_id",
    "github": "_id",
    "twitter": "_id",
    "telegram": "_idd"
  }
}
```
