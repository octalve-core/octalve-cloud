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
   const snapshot=()=>({lines,subtotal:lines.length?(lines.length===2?"32816.15":"17816.15"):null,currency:lines.length?"NGN":null,domains:[],checkout_issue:null});
   page.on("pageerror",e=>errors.push(e.message));
   await context.route("https://console.cloud.octalve.com/api/shopping/session",route=>route.fulfill({status:204,headers}));
   await context.route("https://api.cloud.octalve.com/api/orders/shopping/guest/",async route=>{
    const method=route.request().method();
    if(method==="OPTIONS")return route.fulfill({status:204,headers});
    if(method==="GET"){reads++;await new Promise(r=>setTimeout(r,200));}
    if(method==="POST"){writes++;const body=route.request().postDataJSON();if(body.kind==="service"){assert.equal(body.domain,name);assert.equal(body.plan,"7");assert.equal(body.revision,1);assert.equal(body.cycle,"annual");lines.push({id:"service:7:annual:"+name,selection:body,ready:true,kind:"hosting",name:"Fixture hosting",currency:"NGN",amount:"15000.00",period:"1 year"});}else lines=[{id:"domain:"+body.domain,selection:{kind:"domain",domain:body.domain},ready:true,kind:"domain",name:body.domain,currency:"NGN",amount:"17816.15",renewal:"19435.80",period:"1 year"}];}
    if(method==="DELETE"){writes++;const body=route.request().postDataJSON();lines=lines.filter(l=>l.id!==body.id);}
    return route.fulfill({status:200,headers,json:snapshot()});
   });
   await context.route("https://api.cloud.octalve.com/api/storefront/domains/lookup/**",route=>{
    const domain=new URL(route.request().url()).searchParams.get("domain");
    return route.fulfill({status:200,headers,json:{domain,tld:".com",availability:domain===name?"available":"unavailable",registrar_connected:true,checkout_enabled:false,currency:"NGN",registration_price:"17816.15",renewal_price:"19435.80"}});
   });
   await context.route("https://api.cloud.octalve.com/api/storefront/plans/",route=>route.fulfill({status:200,headers,json:{plans:[{id:7,published_revision:1,name:"Fixture hosting",description:"Test plan",product_type:"shared_hosting",currency:"NGN",features:["Test feature"],billing_cycles:[{key:"annual",label:"Annual",total_price:"14500.00",setup_fee:"500.00",is_default:true}]}]}}));
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
   await page.getByRole("dialog",{name:"Remove this item?"}).getByRole("button",{name:"Cancel",exact:true}).click();
   assert.equal(writes,1);
   await drawer.getByRole("button",{name:"Remove "+name}).click();
   await page.getByRole("dialog",{name:"Remove this item?"}).getByRole("button",{name:"Remove",exact:true}).click();
   await drawer.getByText("Your cart is empty.").waitFor();
   await drawer.getByRole("button",{name:"Close cart"}).click();
   await page.getByRole("button",{name:"Open cart, 0 items"}).waitFor();
   assert.equal(writes,2);
   await page.goto(base+"/cart/");
   await page.getByRole("button",{name:"Search for another domain"}).waitFor();
   assert.equal(await page.getByRole("button",{name:"Search for another domain"}).getAttribute("aria-expanded"),"true");
   await page.goto(base+"/tools/domain-name-search/?q="+name);
   await page.getByRole("button",{name:"Add to cart",exact:true}).first().click();
   await page.getByRole("button",{name:"Open cart, 1 items"}).waitFor();
   await page.goto(base+"/cart/");
   await page.getByRole("button",{name:"Add hosting",exact:true}).click();
   const sheet=page.getByRole("dialog",{name:"Choose your hosting"});
   await sheet.getByText("Fixture hosting",{exact:true}).waitFor();
   assert.ok((await sheet.innerText()).includes("15,000.00"));
   await sheet.getByRole("button",{name:"Cancel",exact:true}).click();
   assert.equal(writes,3);
   await page.getByRole("button",{name:"Add hosting",exact:true}).click();
   await sheet.getByRole("button",{name:"Add hosting",exact:true}).click();
   await page.getByRole("button",{name:"Open cart, 2 items"}).waitFor();
   assert.equal(writes,4);
   assert.equal(await sheet.count(),0);
   for(const asset of ["paystack.svg","flutterwave.svg","monnify.svg","google-pay.png"]){const img=page.locator('img[src="/commerce/'+asset+'"]').first();await img.waitFor({state:"visible"});assert.ok(await img.evaluate(el=>el.complete&&el.naturalWidth>0),"Missing logo "+asset);}
   assert.ok(reads<=20,"unexpected guest cart request fan-out: "+reads);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),"horizontal overflow at "+width);
   assert.deepEqual(errors,[],"browser exception at "+width);
   console.log(JSON.stringify({viewport:width,guestReads:reads,writes,fixtureElapsedMs:Date.now()-start,pageErrors:errors}));
   await context.close();
  }
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
