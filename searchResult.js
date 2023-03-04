function search_details (data)
{
        //s_details contains entire fetch Data
        s_details = data[0];
       
        if(s_details.result.length < 100)
        {
              return
        }
        else
        {
        
                c_data1 = s_details.result.split("Address:");
                comp_data = c_data1[1].split("Suggest an edit");

                //Fetch Name
                c_name_data = s_details.result.split("Terms of Use")
                comp_name = c_name_data[1].split("\n")
                
                search_cname_trim = comp_name[1].trim();
                if(search_cname_trim == "" || search_cname_trim == undefined)
                {
                        console.log("country not found!");
                        search_cname_trim = "Not Available";
                        }
                else
                {
                        document.getElementById("search_companyname").innerHTML = search_cname_trim;
                        document.getElementById("search_companyname").style.marginTop="10px";
                        document.getElementById("search_companyname").style.marginLeft="20px";
                }
                
                //Fetch Address 
                address = comp_data[0].split("\n")
               
                search_caddress_trim = address[0].trim();
                if(search_caddress_trim == "")
                {
                        console.log("Address not found");
                        search_caddress_trim = "Not Available";
                }
                else
                {
                        importer_addr = "<span style='color:#474746;font-weight: bold;'>Address : </span>"
                        document.getElementById("search_address").innerHTML = importer_addr + search_caddress_trim;
                }
                
                
                //Check the visibility of phone number
                check_data = data[0].result.split("\n");
                for (let i = 0; i < check_data.length; i++) 
                {
                var flag = 0;
                if(check_data[i].startsWith("Phone:"))
                {
                        flag = 1;
                        break;
                }
                else
                {
                        flag = 0;
                }
                }
                if(flag == 1)
                {       
                        //Fetch The Phone Number
                        c_number = comp_data[0].split("Phone:")
                        comp_phone = c_number[1].split("\n");
                        importers_phone = comp_phone[0].trim();
                        phone_heading = "<span style='color:#474746;font-weight: bold;'>Phone : </span> "
                        document.getElementById("search_phone").innerHTML = phone_heading + importers_phone;
                        
                }
                else
                {
                        console.log("Phone number not found!");
                        importers_phone = "Not Available";                       

                        //Adjust the address
                        document.getElementById("search_address").style.marginTop='0px';
                }
        }//End of if condition
       
}//End of function


chrome.tabs.query({active: true , currentWindow: true,lastFocusedWindow: true}, function(tabs)
 {
        var tab = tabs[0];
        var check_url = tab.url
        var check_importers = check_url.split("/");
        try {
                if(check_importers[3].includes("tbm=lcl"))
                {
                        function QuerySelectorScript(param){                              
                                let query = document.querySelector(param).innerText;
                                return  query;
                        }
                        
                        chrome.scripting.executeScript(
                                {       target : {tabId : tab.id},                                                                                
                                        func: QuerySelectorScript,
                                        args: ["#rhs > div"],                                        
                                }, search_details); 
                

                var save_button = document.getElementById('save');

                //Send data to API 
                save_button.onclick = function send_data() {                                                                                                                          
                   }//end save
                }
                else
                {
                    console.log("Out of scope!");
                }
         }//try end
         catch (err)
         {
                 console.log("Error occued while fetching the data!")
         }
       
});
