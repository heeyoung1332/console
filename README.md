
<h1 align="center">Cloudforet Console</h1>  
  
<br/>  
<div align="center" style="display:flex;">  
  <img width="300" src="https://user-images.githubusercontent.com/65589909/197983716-71a1bd21-4d6a-4217-b509-177afbadf5bc.png">  
  <p> <br>  
<a  href="https://www.apache.org/licenses/LICENSE-2.0"  target="_blank">  
<img  alt="License: Apache 2.0"  src="https://img.shields.io/badge/License-Apache 2.0-yellow.svg"  />  
</a> <br>
<a href="http://storybook.developer.spaceone.dev/"  target="_blank">  
    <img alt="mirinae storybook" src="https://img.shields.io/badge/Design System-Mirinae-blueviolet.svg?logo=storybook" />  
</a>
</p>  
  
</div>    
  

&nbsp;
  
The present repository contains the source code of the **Cloudforet Web Console** application and related packages such as **Mirinae** which is the design system of the web console.<br/> 

## Documentation

The documentation for the Cloudforet Console is located under the [docs](./docs) directory. <br/>


[![](https://sourcerer.io/fame/wesky93/spaceone-dev/console/images/0)](https://sourcerer.io/fame/wesky93/spaceone-dev/console/links/0)[![](https://sourcerer.io/fame/wesky93/spaceone-dev/console/images/1)](https://sourcerer.io/fame/wesky93/spaceone-dev/console/links/1)[![](https://sourcerer.io/fame/wesky93/spaceone-dev/console/images/2)](https://sourcerer.io/fame/wesky93/spaceone-dev/console/links/2)[![](https://sourcerer.io/fame/wesky93/spaceone-dev/console/images/3)](https://sourcerer.io/fame/wesky93/spaceone-dev/console/links/3)[![](https://sourcerer.io/fame/wesky93/spaceone-dev/console/images/4)](https://sourcerer.io/fame/wesky93/spaceone-dev/console/links/4)[![](https://sourcerer.io/fame/wesky93/spaceone-dev/console/images/5)](https://sourcerer.io/fame/wesky93/spaceone-dev/console/links/5)[![](https://sourcerer.io/fame/wesky93/spaceone-dev/console/images/6)](https://sourcerer.io/fame/wesky93/spaceone-dev/console/links/6)[![](https://sourcerer.io/fame/wesky93/spaceone-dev/console/images/7)](https://sourcerer.io/fame/wesky93/spaceone-dev/console/links/7)

## Getting Started

To run the Web Console, you need follow the steps below.

### 1. Configure the backend services

The Cloudforet Web Console needs backend services to run. <br/>
You can see the details in the [Cloudforet Quick Install Guide](https://cloudforet.io/docs/setup_operation/quick_install). <br/>

### 2. Set up the configuration file

To run the Web Console, you need to set up the environment configuration file. <br/>
<br/>
The configuration file is located in the `apps/web/public/config` directory. <br/>
The default configuration file is `apps/web/public/config/default.json`. <br/>
<br/>
For your development environment, you can copy `apps/web/public/config/development.sample.json` to `apps/web/public/config/<environment>.json` and modify it.
- for development environment: ```apps/web/public/config/development.json```
- for production environment: ```apps/web/public/config/production.json```

The final configuration file will be generated by merging the default configuration file and the environment configuration file. <br/>

#### Config Description

| Name              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Required |
|-------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| CONSOLE_API       | The endpoint of the Console API                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | O        |
| CONSOLE_API_V2    | The endpoint of the Console API V2                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | O        |
| GTAG_ID           | Google analytics Id                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | X        |
| GTM_ID            | Google tag manager Id                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | X        |
| DOMAIN_NAME       | Tenancy name                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | X        |
| DOMAIN_NAME_REF   | In case of `hostname`, it will extract the domain name from the url.</br>In case of `config`, it will take `DOMAIN_NAME` value at the config file.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | X        |
| ADMIN_DOMAIN      | Root domain name                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | X        |
| AMCHARTS_LICENSE  | License information of amcharts                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | X        |
| MOCK              | Mock Api information</br> - `ALL`: boolean(false). Whether apply mock mode to all api requests except for reflection api.</br> - `REFLECTION`: boolean(false). Whether to apply mock mode to reflection api or not.<br/> - `ENDPOINT_V1`: string(""). Mock server endpoint for console api v1.<br/> - `ENDPOINT_V2`: string(""). Mock server endpoint for console api v2.<br/> - `SKIP_TOKEN_CHECK`: boolean(false). Whether to skip checking token. <br/> - `API_LIST_V1`: array of string([]). List of api v1 to enable mock mock mode. <br/> - `API_LIST_V2`: array of string([]). List of api v2 to enable mock mock mode. e.g. ["/identity/*"] <br/> - `API_KEY`: string. API key which is used instead of access token. | X        |
| ASSET_PATH        | Asset endpoint information                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | X        |
| DOMAIN_IMAGE      | The url of the image used for the SignIn page and GNB                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | X        |
| DOCS              | Information for creating related document links. <br/> - Array of objects with labels and links <br/> - Support ejs template grammar <br/> - Provided variable: `lang` (User language code. e.g. "en")                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | X        |
| CONTACT_LINK      | Define the 'contact us' link on the SignIn page                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | X        |


### 3. Add your chart license keys to your config file (Optional)

The Web Console internally uses amCharts(both 4 and 5 versions) for charts. <br/>
Before using the Console, look carefully at [amCharts' license](https://www.amcharts.com/online-store/licenses-explained/). <br/>
You can download and use all amCharts 4 and 5 products for free. <br/>
The only limitation of the free version is that a small amCharts logo will be displayed in the corner of your charts. <br/>
If you’d rather have your charts without any branding, please purchase a [commercial license](https://www.amcharts.com/online-store/) and configure it to your config file with the following format: <br/>

```json
{
 "AMCHARTS_LICENSE": {
  "ENABLED": true,
  "CHARTS": "",
  "MAPS": "",
  "TIMELINE": "",
  "AM5_CHARTS": "",
  "AM5_MAPS": ""
 }
}
```

## Run

You can run the Web Console on your local with following commands.

```shell
npm install

npm run start:web
```

## Testing

### Set variables for e2e test

Add `apps/web/playwright/local.env` file into project root.
```
  USERNAME=testuser
  PASSWORD=password
  BASEURL=https://example.com/ 
```
- `BASEURL` is an optional variable. Default is `http://localhost:8080`


## 🧩 Mirinae - Cloudforet Design System  

You can see the details in the [Mirinae storybook](http://storybook.developer.spaceone.dev/). <br/>
You can see the description of the Mirinae in the [Mirinae package](./packages/mirinae/README.md). <br/>

## Contributing

- [Develop with local turbo cache server](./dev/turbo-cache-server.md)

TBU

## 👨‍👩‍👧 Author  
  
See our [OWNERS](https://github.com/cloudforet-io/console/blob/master/AUTHORS) file.   
  
&nbsp;
  
## 📝 License

This project is [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) licensed.

