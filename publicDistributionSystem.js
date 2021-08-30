'use strict';
const { Contract } = require('fabric-contract-api');
//const p= require('./myfile.csv');
var fs = require('fs');
const csv = require('csv-parser');

class PublicDistrubutionSystem extends Contract {


	async register(ctx, name, addharno, familyMember, land, tax_payer, vehicle, familyIncome, fourwheeler) {
		if (!name && !addharno && !familyMember && !land && !tax_payer && !vehicle && !familyIncome && !fourwheeler) {
			throw new Error("missing arguments");
		}
		if ((familyIncome < 15000) && (vehicle == "no") && (land <= 2) && (fourwheeler == "no")) {
			await this.yellowCard(ctx, name, addharno, familyMember, land, tax_payer, vehicle, familyIncome, fourwheeler);
			console.log("yellowCard ......");
		} else if ((familyIncome > 15000) && (familyIncome < 100000) && (fourwheeler == "no") && (land <= 4)) {
			await this.SaffronCard(ctx, name, addharno, familyMember, land, tax_payer, vehicle, familyIncome, fourwheeler);
			console.log("SaffronCard ......");

		} else if (familyIncome > 100000) {
			await this.whiteCard(ctx, name, addharno, familyMember, land, tax_payer, vehicle, familyIncome, fourwheeler);
			console.log("whiteCard..............");
		} else {
			console.log("please enter proper data");
		}
	}

	async yellowCard(ctx, name, addharno, familyMember, land, tax_payer, vehicle, familyIncome, fourwheeler) {
		var Name;
		var Addharno;
		var FamilyMember;
		var Land;
		var Tax_payer;
		var Vehicle;
		var FamilyIncome;
		var Fourwheeler;
		const yellowcard = {
			Name: name,
			Addharno: addharno,
			FamilyMember: familyMember,
			Land: land,
			Tax_payer: tax_payer,
			Vehicle: vehicle,
			FamilyIncome: familyIncome,
			Fourwheeler: fourwheeler
		};

		const dataH = [];
		dataH[dataH.length] = yellowcard;
		console.log(yellowcard);
		console.log("addhare numbere " + yellowcard.Addharno);
		for (const yellowcard of dataH) {
			yellowcard.docType = 'yellowcard';
			await ctx.stub.putState(yellowcard.Addharno, Buffer.from(JSON.stringify(yellowcard)));
			console.info(`Asset ${yellowcard.Addharno} initialized`);
		}
		console.log("yellowCard");
	}



	async SaffronCard(ctx, name, addharno, familyMember, land, tax_payer, vehicle, familyIncome, fourwheeler) {
		var Name;
		var Addharno;
		var FamilyMember;
		var Land;
		var Tax_payer;
		var Vehicle;
		var FamilyIncome;
		var Fourwheeler;
		const saffronCard = {
			Name: name,
			Addharno: addharno,
			FamilyMember: familyMember,
			Land: land,
			Tax_payer: tax_payer,
			Vehicle: vehicle,
			FamilyIncome: familyIncome,
			Fourwheeler: fourwheeler,
		};

		const dataH = [];
		dataH[dataH.length] = saffronCard;
		console.log(saffronCard.Addharno);
		for (const saffronCard of dataH) {
			saffronCard.docType = 'saffronCard';
			await ctx.stub.putState(saffronCard.Addharno, Buffer.from(JSON.stringify(saffronCard)));
			console.info(`Asset ${saffronCard.Addharno} initialized`);
		}
		console.log("SaffronCard");
	}


	async whiteCard(ctx, name, addharno, familyMember, land, tax_payer, vehicle, familyIncome, fourwheeler) {
		var Name;
		var Addharno;
		var FamilyMember;
		var Land;
		var Tax_payer;
		var Vehicle;
		var FamilyIncome;
		var Fourwheeler;
		const whiteCard = {
			Name: name,
			Addharno: addharno,
			FamilyMember: familyMember,
			Land: land,
			Tax_payer: tax_payer,
			Vehicle: vehicle,
			FamilyIncome: familyIncome,
			Fourwheeler: fourwheeler,
		};

		const dataH = [];
		dataH[dataH.length] = whiteCard;
		console.log(whiteCard.Addharno);
		for (const whiteCard of dataH) {
			whiteCard.docType = 'whiteCard';
			await ctx.stub.putState(whiteCard.Addharno, Buffer.from(JSON.stringify(whiteCard)));
			console.info(`Asset ${whiteCard.Addharno} initialized`);
			console.log("whiteCard");
		}
	}


	async farmer(ctx, fname, addharNo, grains, price, quantity) {
		var FName;
		var AddharNo;
		var Grains = [];
		var grainlistd;
		var Price = [];
		var grainprice;
		var allgrains = [];
		var sellgrains;
		var Quantity = [];
		var totalPrice = [];
		var GRAINS;
		var PRICE;
		var QUENTITY;
		var TOTALPRICE;

		const Array_Grains = grains.split(",");
		Grains = Array_Grains;
		const Array_Price = price.split(",");
		Price = Array_Price;
		const Array_quentity = quantity.split(",");
		Quantity = Array_quentity;

		for (var i = 0; i < Array_Grains.length; i++) {
			totalPrice[i] = Array_Price[i] * Array_quentity[i];
			allgrains[i] = { "GRAINS": Array_Grains[i], "PRICE": Price[i], "QUENTITY": Array_quentity[i], "TOTALPRICE": totalPrice[i] };
		}
		var farmerData = {
			FName: fname,
			AddharNo: addharNo,
			sellgrains: allgrains
		};

		console.log("object :" + JSON.stringify(farmerData));


		const data = [];
		data[data.length] = farmerData;

		console.log(data);
		for (const farmerData of data) {
			farmerData.docType = 'farmerData';
			await ctx.stub.putState(farmerData.AddharNo, Buffer.from(JSON.stringify(farmerData)));
			console.info(`Asset ${farmerData.AddharNo} initialized`);
		}
		console.log("farmer...............");

		const iterator = await ctx.stub.getStateByRange('', '');
		let result = await iterator.next();
		var count = 0;
		while (!result.done) {
			const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
			let record;
			try {
				record = JSON.parse(strValue);
			} catch (err) {
				console.log(err);
				record = strValue;
			}
			if (record.docType == "farmerData") {
				count++;
			}
			result = await iterator.next();
		}
		const d = await this.CombineGrainsData(ctx, count, JSON.stringify(allgrains));
	}

	/*async sellGrains(ctx,addharNo,foodGrains,quantity){
		  var FoodGrains;
	  var food_grains;
	  var que;
	  var Quantity;
	  var farnerdetails;	
			console.log("sellGrains...................");
		  const iterator = await ctx.stub.getStateByRange('', '');
	  let result = await iterator.next();
		  while (!result.done) {
	  const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
	  let record;
	  try {
	   record = JSON.parse(strValue);
	   } catch (err) {
	  console.log(err);                                                                                                                                                               record = strValue;
	}
		  if(record.AddharNo==addharNo)
		  {
//			  var F=FoodGrains[i]=foodGrains;
//			  var Q=Quantity[i]=quantity;
			  
			  
			  const datas={
				  AddharNo:record.AddharNo,
				  food_grains:foodGrains,
				  que:quantity
			  }
			  let grains=[];
			  
				   
			  //console.log("grains:"+grains.length);
						  
			  //grains.push({datas});
			  if(grains.length==0)	  
				  {
			  console.log("if statement"+grains.length);
			  grains[grains.length]=datas;
			  grains.length++;
			  }else{
				   console.log("else statement"+grains.length);
			  grains[grains.length]=datas;
				  grains.length++;
			  }
			  //grains[grains.length]=datas;


		  const sellgrains={
			  AddharNo:record.AddharNo,
			  allgrains:grains,
		  };

			  const data=[];
	
		  data[data.length]=sellgrains;
			  for (const sellgrains of data) {
			  sellgrains.docType = 'sellgrains';
						  await ctx.stub.putState(sellgrains.AddharNo, Buffer.from(JSON.stringify(sellgrains)));
			  console.info(`Asset ${sellgrains.AddharNo} initialized`);
			}

		  }
		//  console.log("key :"+record.Key);
	
		  console.log(JSON.stringify(record));
		  result = await iterator.next();
		}

	}
	*/

	async accessgrainsData(ctx) {
		var allResults = [];
		var Unique;
		var docType;
		let record;
		const iterator = await ctx.stub.getStateByRange('', '');
		let result = await iterator.next();
		//	var k=0;
		while (!result.done) {
			const strValue = Buffer.from(result.value.value.toString()).toString('utf8');

			try {
				record = JSON.parse(strValue);
			} catch (err) {
				console.log(err);
				record = strValue;
			}

			if (record.docType == "farmerData") {
				allResults = allResults.concat(record.sellgrains);
			}
			result = await iterator.next();
		}


		var unique = [...new Set(allResults)];
		var alldata = {
			Unique: unique,
			docType: "allgrainsData"
		};
		await ctx.stub.putState("allgrainsData", Buffer.from(JSON.stringify(alldata)));
		return unique;
	}


	async centre(ctx, C_Empid, E_name) {
		var c_empid;
		var e_name;
		const centre = {
			c_empid: C_Empid,
			e_name: E_name
		};

		const data = [];
		data[data.length] = centre;
		console.log(" data :" + data);
		for (const centre of data) {
			centre.docType = 'centre';
			await ctx.stub.putState(centre.c_empid, Buffer.from(JSON.stringify(centre)));
			console.info(`Asset ${centre.c_empid} initialized`);
		}
		console.log("centre...............");
	}



	async CombineGrainsData(ctx, allocatedata, sellgrains) {
		var allocateData;
		var Sellgrains;
		const allgrains = {
			allocateData: allocatedata,
			Sellgrains: sellgrains
		};
		console.log(allgrains);
		const data = [];
		data[data.length] = allgrains;
		console.log(" data :" + data);
		for (const allgrains of data) {
			allgrains.docType = 'allgrains';
			await ctx.stub.putState(allgrains.allocateData.toString(), Buffer.from(JSON.stringify(allgrains)));
		}
	}

	async ViewGrains(ctx, c_empid) {
		var listdata = [];
		var allResults = [];
		listdata = await this.accessgrainsData(ctx);
		var data = await ctx.stub.getState(c_empid);
		if (data == "") {
			throw new Error("only center Emp can view Grains list");
		}
		else {
			console.log("\n**************************************************************************************\n");
			for (const sellgrains of listdata) {
				console.log(JSON.stringify(sellgrains));
			}
			return listdata;
		}
	}


	async AllocatePriceToGrains(ctx, c_empid, allocatedprice) {
		const Array_allocatedPrice = allocatedprice.split(",");
		var i = 0;
		var allocatedPrice;
		var totalAllocatedPrice;
		console.log("\n array :" + Array_allocatedPrice);
		var listdata = [];
		var data = await ctx.stub.getState(c_empid);

		let record;
		const iterator = await ctx.stub.getStateByRange('', '');
		let result = await iterator.next();
		//	var k=0;
		while (!result.done) {
			const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
			try {
				record = JSON.parse(strValue);
			} catch (err) {
				console.log(err);
				record = strValue;
			}

			if (record.docType == "centre") {
				console.log("\n AllocatePriceToGrains : " + JSON.stringify(record));
			}
			result = await iterator.next();
		}


		listdata = await this.ViewGrains(ctx, c_empid);

		for (const sellgrains of listdata) {

			sellgrains.allocatedPrice = Array_allocatedPrice[i];
			sellgrains.totalAllocatedPrice = sellgrains.allocatedPrice * sellgrains.QUENTITY;
			i++;
			console.log("allocated data : " + JSON.stringify(sellgrains));
		}

		await ctx.stub.putState("centerAllocatedData", Buffer.from(JSON.stringify(listdata)));
	}


	async stateGovernments(ctx, S_Empid, E_name) {
		var s_empid;
		var e_name;
		var statedata = [];
		const stateGovernment = {
			s_empid: S_Empid,
			e_name: E_name
		};

		const data = [];
		data[data.length] = stateGovernment;
		console.log(" data :" + data);
		for (const stateGovernment of data) {
			stateGovernment.docType = 'stateGovernment';
			await ctx.stub.putState(stateGovernment.s_empid, Buffer.from(JSON.stringify(stateGovernment)));
			console.info(`Asset ${stateGovernment.s_empid} initialized`);
		}
		console.log("stateGovernment...............");

		let record;
		const iterator = await ctx.stub.getStateByRange('', '');
		let result = await iterator.next();
		//	var k=0;
		while (!result.done) {
			const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
			try {
				record = JSON.parse(strValue);
			} catch (err) {
				console.log(err);
				record = strValue;
			}

			if (record.docType == "stateGovernment") {
				//	console.log("\n stateGovernment : "+JSON.stringify(record));

				statedata = statedata.concat(record);
			}
			result = await iterator.next();
		}

		console.log(statedata);
		console.log("********************** END *****************************");
		return statedata;
	}

	
	
     async AAY(ctx,state,pun,cwa,cst,cm)
	 {
		const Array_state = state.split(",");
		const Array_pun=pun.split(",");
		const Array_cwa=cwa.split(",");
		const Array_cst=cst.split(",");
		const Array_cm=cm.split(",");

        var HungerData=[];
		 var Pun;
		 var Cwa;
		 var Cst;
		 var Cm;
		 var GHI;
		 var HungerRatio;
		 var p=1/3;
		 var c=1/6;
          var PUN;
		 var CWA;
		 var CST;
		 var CM;

		for (var i = 0; i < Array_state.length; i++) {
            
			Pun=(Array_pun[i]/80)*100;
		    Cwa=(Array_cwa[i]/30)*100;
		    Cst=(Array_cst[i]/70)*100;
		    Cm=(Array_cm[i]/35)*100;

             PUN=p*Pun;
		     CWA=c*Cwa;
		     CST=c*Cst;
		     CM=p*Cm;
			GHI=PUN+CWA+CST+CM;
			HungerRatio=(GHI-100);
			HungerData[i]={"STATE":Array_state[i],"HungerRatio":HungerRatio};
		}

		const hungerratio={
           "HungerRatio":HungerData,
		   "docType":"HungerData",
		};
		await ctx.stub.putState("hungerRatio", Buffer.from(JSON.stringify(hungerratio)));
	 }
	


	async GrainsDitribution(ctx, s_empid, shops_name) {
		var data = await ctx.stub.getState(s_empid);
		//	console.log(data);
	
		if (data == "") {
			throw new Error("only stateGovernments Emp can do ditributed ");
		}
		else {
			console.log("data : " + data.s_empid);
			const Array_allocatedPrice = shops_name.split(",");
		}
	}


	



	/*
	async fairPriceShops(ctx)
	{
	
	}

	async beneficiary(ctx)
	{
	
	}
*/
	async GetAllAssets(ctx) {
		const allResults = [];
		const iterator = await ctx.stub.getStateByRange('', '');
		let result = await iterator.next();
		while (!result.done) {
			const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
			let record;
			try {
				record = JSON.parse(strValue);
			} catch (err) {
				console.log(err);
				record = strValue;
			}
			console.log("id =" + result.value.key);
			allResults.push({ Key: result.value.key, Record: record });
			result = await iterator.next();
		}
		return JSON.stringify(allResults);
	}
}
module.exports = PublicDistrubutionSystem;
