"use strict";
const assert=require("node:assert/strict");
const {chromium}=require(process.env.COMMERCE_PLAYWRIGHT_PATH||"playwright");
const base=process.env.COMMERCE_BROWSER_BASE||"http://127.0.0.1:4173";
const name="fixture-cart-check.com";
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  for(const width of [320,390,768,1440]){
   const context=await browser.newContext({viewport:{width,height:900}});
   const page=await context.newPage();
   const errors=[];let reads=0,writes=0;let lines=[];
   const headers={"access-control-allow-origin":base,"access-control-allow-credentials":"true","access-control-allow-headers":"content-type,x-shopping-scope","access-control-allow-methods":"GET,POST,DELETE,PATCH,OPTIONS"};
   const snapshot=()=>({lines,subtotal:lines.length?"17816.15":null,currency:lines.length?"NGN":null,domains:[],checkout_issue:null});
   page.on("pageerror",e=>errors.push(e.message));
   await context.route("https://console.cloud.octalve.com/api/shopping/session",route=>route.fulfill({status:204,headers}));
   await context.route("https://api.cloud.octalve.com/api/orders/shopping/guest/",async route=>{
    const method=route.request().method();
    if(method==="OPTIONS")return route.fulfill({status:204,headers});
    if(method==="GET"){reads++;await new Promise(r=>setTimeout(r,200));}
    if(method==="POST"){writes++;const body=route.request().postDataJSON();lines=[{id:"domain:"+body.domain,selection:{kind:"domain",domain:body.domain},ready:true,kind:"domain",name:body.domain,currency:"NGN",amount:"17816.15",renewal:"19435.80",period:"1 year"}];}
    if(method==="DELETE"){writes++;lines=[];}
    return route.fulfill({status:200,headers,json:snapshot()});
   });
   await context.route("https://api.cloud.octalve.com/api/storefront/domains/lookup/**",route=>{
    const domain=new URL(route.request().url()).searchParams.get("domain");
    return route.fulfill({status:200,headers,json:{domain,tld:".com",availability:domain===name?"available":"unavailable",registrar_connected:true,checkout_enabled:false,currency:"NGN",registration_price:"17816.15",renewal_price:"19435.80"}});
   });
   const start=Date.now();
   await page.goto(base+"/tools/domain-name-search/?q="+name);
   await page.getByRole("button",{name:/Open cart/}).waitFor();
   const add=page.getByRole("button",{name:"Add to cart",exact:true}).first();
   await add.waitFor({timeout:20000});await add.click();
   await page.getByText("Added to your cart",{exact:true}).waitFor();
   assert.equal(await page.locator("dialog[data-commerce-drawer][open]").count(),0);
   await page.getByRole("button",{name:"Open cart, 1 items"}).waitFor();
   await page.getByRole("button",{name:"Open cart, 1 items"}).click();
   const drawer=page.locator("dialog[data-commerce-drawer]");
   await drawer.waitFor({state:"visible"});assert.ok((await drawer.innerText()).includes("17,816.15"));
   await drawer.getByRole("button",{name:"Remove "+name}).click();
   await drawer.getByText("Your cart is empty.").waitFor();
   await drawer.getByRole("button",{name:"Close cart"}).click();
   await page.getByRole("button",{name:"Open cart, 0 items"}).waitFor();
   assert.equal(writes,2);assert.ok(reads<=8,"unexpected guest cart request fan-out: "+reads);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),"horizontal overflow at "+width);
   assert.deepEqual(errors,[],"browser exception at "+width);
   console.log(JSON.stringify({viewport:width,guestReads:reads,writes,fixtureElapsedMs:Date.now()-start,pageErrors:errors}));
   await context.close();
  }
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
