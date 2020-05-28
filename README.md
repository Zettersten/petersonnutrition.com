![](https://github.com/Zettersten/petersonnutrition.com/blob/master/src/i/fblogo.gif?raw=true)

# petersonnutrition.com

Peterson Nutrition &amp; Fitness, Richmond, VA http://www.petersonnutrition.com/

## Getting started

1. Clone repo 
   1. `$ git clone https://github.com/Zettersten/petersonnutrition.com.git`
2. Install dependencies:
   1. `$ npm install gulp -g`
   2. `$ npm install`
3. Run dev server and start watching the 'src' for changes
   1. `$ gulp`

## Deploy

Create a `.env.json` file with the following object in the root of this project's directory

```json
{
    "FTP_HOST": "...",
    "FTP_USER": "...",
    "FTP_PASSWORD": "...""
}
```

## Write basic html

This project uses a plugin call `gulp-html-tag-include` (https://www.npmjs.com/package/gulp-html-tag-include) which implaments a special html syntax for including html documents.

**Example: Master.html**

```html
<div>
    Hello <include src="Template.html" title="World">
</div>
```

**Example: Template.html**

```html
<span>@@content</span>
```

**Example: Master.html (new)**

```html
<div>
    Hello <span>World</span>
</div>
```

Any changes to html files within the `/src` folder will automatically build to the `/dist` folder. The `/dist` folder is what get's deployed and what is served via the `$ gulp` dev server. Don't make changes directly to the `/dist` folder. It gets cleaned on builds and deploys.

| Collaborators |
| --- |
| Erik Zettersten (erik@nenvy.com) |
| Cameron Stewart (cam@nenvy.com) |