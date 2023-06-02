package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	_ "github.com/mattn/go-sqlite3"
	"github.com/spf13/viper"

	"github.com/thetatoken/theta/query"
	"github.com/thetatoken/theta/tx"
)

func indexHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/offchain" {
		http.Error(w, "404 not found.", http.StatusNotFound)
		return
	}

	if r.Method != "GET" {
		http.Error(w, "Method is not supported.", http.StatusNotFound)
		return
	}

	// data := []byte("V1 of student's called")
	w.Header().Set("Content-Type", "text/html")
	w.WriteHeader(200)
	fmt.Fprintf(w, "<a href=\"/\">Return to home page</a><br />\n")
	fmt.Fprintf(w, "<a href=\"/offchain/links\">GoLang Links</a><br />\n")
	fmt.Fprintf(w, "<a href=\"/index.html\">index</a><br />\n")
	fmt.Fprintf(w, "<a href=\"/form.html\">form</a><br />\n")
	// w.Write(data)
}

func linksHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/offchain/links" {
		http.Error(w, "404 not found.", http.StatusNotFound)
		return
	}

	if r.Method != "GET" {
		http.Error(w, "Method is not supported.", http.StatusNotFound)
		return
	}

	// data := []byte("V1 of student's called")
	w.Header().Set("Content-Type", "text/html")
	w.WriteHeader(200)
	fmt.Fprintf(w, "<a href=\"/\">Return to home page</a><br />\n")
	fmt.Fprintf(w, "<a href=\"/offchain/links\">GoLang Links</a><br />\n")
	fmt.Fprintf(w, "<a href=\"/index.html\">index</a><br />\n")
	fmt.Fprintf(w, "<a href=\"/form.html\">form</a><br />\n")
	fmt.Fprintf(w, "<a href=\"/offchain/acct\" target=\"acct\">acct</a><br />\n")
	fmt.Fprintf(w, "<a href=\"/offchain/reserve\" target=\"reserve\">reserve</a><br />\n")
	// w.Write(data)
}

func formHandler(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		fmt.Fprintf(w, "ParseForm() err: %v", err)
		return
	}
	fmt.Fprintf(w, "POST request successful")
	name := r.FormValue("name")
	address := r.FormValue("address")

	fmt.Fprintf(w, "Name = %s\n", name)
	fmt.Fprintf(w, "Address = %s\n", address)
}

func acctHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/offchain/acct" {
		http.Error(w, "404 not found.", http.StatusNotFound)
		return
	}

	if r.Method != "GET" {
		http.Error(w, "Method is not supported.", http.StatusNotFound)
		return
	}

	// endpoint := "https://theta-dev-theta-privatenet.cfapps.eu10.hana.ondemand.com/rpc"
	// address := "0x2E833968E5bB786Ae419c4d13189fB081Cc43bab"
	address := tx.Alice
	resource_id := "rid1000001"
	tfuel := "20.000"
	password := "qwertyuiop"

	output := query.Account(address)

	w.Header().Set("Content-Type", "text/html")
	w.WriteHeader(200)

	fmt.Fprintf(w, "<pre><br />\n")

	fmt.Fprintf(w, "output: %s\n", output)

	fmt.Fprintf(w, "</pre><br />\n")

	var arbitrary_json map[string]interface{}
	//var reserve_funds map[string]interface{}

	var lubh string

	err := json.Unmarshal([]byte(output), &arbitrary_json)
	if err != nil {
		log.Fatal(err)
	}
	nextseq, _ := strconv.Atoi(fmt.Sprintf("%v", arbitrary_json["sequence"]))
	nextseq++

	var reserve_seq = ""
	var payment_seq = "1"
	var accum_tfuel = ""

	fmt.Fprintf(w, "nextseq: %d<br />\n", nextseq)

	for key, value := range arbitrary_json {
		switch key {
		case "last_updated_block_height":
			lubh = value.(string)
		case "reserved_funds":
			switch vv := value.(type) {
			//Here we know value is going to be []interface{}. Generally you have to impliment for every single datat type. Yes. This is horrible stuff
			case []interface{}:
				fmt.Fprintf(w, "rf is array: \n")
				// p.Tv_shows=nil   //Clear this
				//Now we can access the individual elements of the JSON Array
				if len(vv) > 0 {
					fmt.Fprintf(w, "ok<br />\n")
					for i, u := range vv {
						if i == 0 {
						} //Otherwise throws error 'i is not used'
						reserve_fund := u.(map[string]interface{})
						// p.Tv_shows = append(p.Tv_shows, u.(string))	// Assert and append
						// fmt.Println(p)	// There! p is updated!
						//					fmt.Fprintf(w, "x: %s\n", u.(string))
						reserve_seq = reserve_fund["reserve_sequence"].(string)
						transfer_records := reserve_fund["transfer_records"].([]interface{})
						for key2, value2 := range transfer_records {
							if key2 == 0 {
							} //Otherwise throws error
							// 	switch key2 {
							// 	case "service_payment":
							transfer_record := value2.(map[string]interface{})
							sp := transfer_record["service_payment"]

							svc_pmt := sp.(map[string]interface{})
							ps := svc_pmt["payment_sequence"]

							payment_seq = ps.(string)

							//payment_seq = value2.(data)["service_payment"].(data)["payment_sequence"].(string)
							payseq, _ := strconv.Atoi(payment_seq)
							payseq++
							payment_seq = fmt.Sprintf("%d", payseq)

							src := svc_pmt["source"]
							coin_src := src.(map[string]interface{})

							scoins := coin_src["coins"]
							scoinsparts := scoins.(map[string]interface{})

							tfws := scoinsparts["tfuelwei"].(string)

							tfwf, _ := strconv.ParseFloat(tfws, 64)

							tfwf = tfwf / 1000000000000000000.0
							tfwf += 20.000
							accum_tfuel = fmt.Sprintf("%f", tfwf)

							//fmt.Fprintf(w, "value2:%s<br />\n", value2.(data)["service_payment"].(data)["payment_sequence"].(string))
							// 	}
						}

						// payment_seq = reserve_fund["payment_sequence"].(string)

						// payseq, _ := strconv.Atoi(payment_seq)
						// payseq++

						// payment_seq = fmt.Sprintf("%d", payseq)

						fmt.Fprintf(w, "reserve_sequence: %s<br />\n", reserve_seq)
						fmt.Fprintf(w, "payment_sequence: %s<br />\n", payment_seq)

						fmt.Fprintf(w, "<a href=\"/offchain/payment?from=%s&to=%s&payment_seq=%s&reserve_seq=%s&resource_id=%s&tfuel=%s&password=%s&on_chain=false&format=html\">off-chain payment</a><br />\n", tx.Alice, tx.Bob, payment_seq, reserve_seq, resource_id, tfuel, password)
						if accum_tfuel != "" {
							fmt.Fprintf(w, "<a href=\"/offchain/payment?from=%s&to=%s&payment_seq=%s&reserve_seq=%s&resource_id=%s&tfuel=%s&password=%s&on_chain=false&format=html\">off-chain payment +%s</a><br />\n", tx.Alice, tx.Bob, payment_seq, reserve_seq, resource_id, accum_tfuel, password, accum_tfuel)
						}
					}
				} else {
					fmt.Fprintf(w, "empty <a href=\"/offchain/reserve\">reserve</a> <br />\n")
				}
			}
		}
	}

	fmt.Fprintf(w, "last_updated_block_height: %s<br />\n", lubh)

}

func date_test() {
	// date +%s
	// date -u +%Y-%m-%d
	vals := []string{"2021-08-04", "2021-08-05", "2021-08-06"}

	for _, val := range vals {

		t, err := time.Parse("2006-01-02", val)

		if err != nil {

			log.Fatal(err)
		}

		//[4] is the market close price
		// [
		//   [
		//     [0]1499040000000,      // Open time
		//     [1]"0.01634790",       // Open
		//     [2]"0.80000000",       // High
		//     [3]"0.01575800",       // Low
		//     [4]"0.01577100",       // Close
		//     [5]"148976.11427815",  // Volume
		//     [6]1499644799999,      // Close time
		//     [7]"2434.19055334",    // Quote asset volume
		//     [8]308,                // Number of trades
		//     [9]"1756.87402397",    // Taker buy base asset volume
		//     [0]"28.46694368",      // Taker buy quote asset volume
		//     [0]"17928899.62484339" // Ignore.
		//   ]
		// ]

		fmt.Println("curl -s --location --request GET 'https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&startTime=" + strconv.FormatInt(t.Unix()*1000, 10) + "&limit=1' --header 'Content-Type: application/json' | jq .[][4]")
	}

}

func sqlite_init() {
	database, _ := sql.Open("sqlite3", "./cache.db")
	statement, _ := database.Prepare("CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY, firstname TEXT, lastname TEXT)")
	statement.Exec()
	statement, _ = database.Prepare("INSERT INTO people (firstname, lastname) VALUES (?, ?)")
	statement.Exec("Rob", "Gronkowski")
	statement.Exec("Andrew", "Lunde")
	statement.Exec("John", "Galt")
	rows, _ := database.Query("SELECT id, firstname, lastname FROM people")
	var id int
	var firstname string
	var lastname string
	for rows.Next() {
		rows.Scan(&id, &firstname, &lastname)
		fmt.Println(strconv.Itoa(id) + ": " + firstname + " " + lastname)
	}
}

func reserveHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/offchain/reserve" {
		http.Error(w, "404 not found.", http.StatusNotFound)
		return
	}

	if r.Method != "GET" {
		http.Error(w, "Method is not supported.", http.StatusNotFound)
		return
	}

	// endpoint := "https://theta-dev-theta-privatenet.cfapps.eu10.hana.ondemand.com/rpc"

	tx.SetChainID(tx.ReserveFundCmd, "privatenet")

	tx.SetFee(tx.ReserveFundCmd, "0.3")

	tx.SetFrom(tx.ReserveFundCmd, tx.Alice)

	acctinfo := query.Account(tx.Alice)
	var result map[string]interface{}
	err := json.Unmarshal([]byte(acctinfo), &result)
	if err != nil {
		log.Fatal(err)
	}
	nextseq, _ := strconv.Atoi(fmt.Sprintf("%v", result["sequence"]))
	nextseq++

	tx.SetSeq(tx.ReserveFundCmd, fmt.Sprintf("%d", nextseq))

	// tx.SetConfigPath("./thetacli")
	tx.SetDuration(tx.ReserveFundCmd, "30")
	//	tx.SetResourceIDs(`["rid1000001"]`)
	tx.SetPassword(tx.ReserveFundCmd, "qwertyuiop")

	output := tx.DoReserveFund()
	//output := tx.ReserveFund(reserveFundCmd, make([]string, 0))

	w.Header().Set("Content-Type", "text/html")
	w.WriteHeader(200)

	fmt.Fprintf(w, "<pre><br />\n")
	fmt.Fprintf(w, "output: %s<br />\n", output)
	fmt.Fprintf(w, "</pre><br />\n")

	fmt.Fprintf(w, "<a href=\"/offchain/acct\">acct</a><br />\n")

}

func paymentHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/offchain/payment" {
		http.Error(w, "404 not found.", http.StatusNotFound)
		return
	}

	if r.Method != "GET" {
		http.Error(w, "Method is not supported.", http.StatusNotFound)
		return
	}

	return_json_only := false
	// if r.Header.Get("Expect") != "application/json" {
	// 	return_json_only = true
	// }

	rquery := r.URL.Query()
	from := rquery.Get("from")
	to := rquery.Get("to")
	payment_seq := rquery.Get("payment_seq")
	reserve_seq := rquery.Get("reserve_seq")
	resource_id := rquery.Get("resource_id")
	tfuel := rquery.Get("tfuel")
	password := rquery.Get("password")
	on_chain := rquery.Get("on_chain")
	format := rquery.Get("format")

	if format == "json" {
		return_json_only = true
	}

	// endpoint := "https://theta-dev-theta-privatenet.cfapps.eu10.hana.ondemand.com/rpc"

	tx.SetChainID(tx.ServicePaymentCmd, "privatenet")

	tx.SetFee(tx.ServicePaymentCmd, "0.3")

	tx.SetFrom(tx.ServicePaymentCmd, from)

	tx.SetTo(tx.ServicePaymentCmd, to)

	tx.SetResourceID(tx.ServicePaymentCmd, resource_id)

	tx.SetTFuelAmt(tx.ServicePaymentCmd, tfuel)

	tx.SetPaymentSeq(tx.ServicePaymentCmd, payment_seq)

	// acctinfo := query.Account(tx.Alice)
	// var result map[string]interface{}
	// err := json.Unmarshal([]byte(acctinfo), &result)
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// resseq, _ := strconv.Atoi(fmt.Sprintf("%v", result["sequence"]))

	// tx.SetReserveSeq(tx.ServicePaymentCmd, fmt.Sprintf("%d", resseq))
	tx.SetReserveSeq(tx.ServicePaymentCmd, reserve_seq)

	tx.SetPassword(tx.ServicePaymentCmd, "qwertyuiop")

	if on_chain == "true" {
		src_sig := rquery.Get("src_sig")
		tx.SetSourceSig(tx.ServicePaymentCmd, src_sig)
		tx.SetOnChain(tx.ServicePaymentCmd, true)
	} else {
		tx.SetSourceSig(tx.ServicePaymentCmd, "")
		tx.SetOnChain(tx.ServicePaymentCmd, false)
	}

	tx.SetDebugging(tx.ServicePaymentCmd, false)

	// Check to see if the ReserveFund is still there...

	output := tx.DoServicePayment()
	//output := tx.ReserveFund(reserveFundCmd, make([]string, 0))

	if return_json_only {
		w.Header().Set("Content-Type", "application/json")
	} else {
		w.Header().Set("Content-Type", "text/html")
	}
	w.WriteHeader(200)

	if return_json_only {
		fmt.Fprintf(w, "%s", output)
	} else {
		fmt.Fprintf(w, "<pre><br />\n")
		fmt.Fprintf(w, "output: %s<br />\n", output)
		fmt.Fprintf(w, "</pre><br />\n")
	}

	if on_chain == "false" {
		var result2 map[string]interface{}
		err2 := json.Unmarshal([]byte(output), &result2)
		if err2 != nil {
			log.Fatal(err2)
		}

		src_src := result2["source"]
		src_sig := src_src.(map[string]interface{})
		if !return_json_only {
			fmt.Fprintf(w, "<a href=\"/offchain/payment?from=%s&to=%s&payment_seq=%s&reserve_seq=%s&resource_id=%s&tfuel=%s&password=%s&on_chain=true&format=html&src_sig=%s&\">on-chain payment src_sig = %s</a><br />\n", from, to, payment_seq, reserve_seq, resource_id, tfuel, password, src_sig["signature"], src_sig["signature"])
		}

		tfwf, _ := strconv.ParseFloat(tfuel, 64)

		tfwf += 20.000
		accum_tfuel := fmt.Sprintf("%f", tfwf)

		if !return_json_only {
			fmt.Fprintf(w, "<br /> -OR- <br /><br />\n")

			fmt.Fprintf(w, "<a href=\"/offchain/payment?from=%s&to=%s&payment_seq=%s&reserve_seq=%s&resource_id=%s&tfuel=%s&password=%s&on_chain=false&format=html&\">off-chain payment %s</a><br />\n", from, to, payment_seq, reserve_seq, resource_id, accum_tfuel, password, accum_tfuel)
		}
		// } else {

	} else {
		if !return_json_only {
			fmt.Fprintf(w, "<a href=\"/offchain/acct\">acct</a><br />\n")
		}
	}

}

// Alice=2E833968E5bB786Ae419c4d13189fB081Cc43bab
// Bob=70f587259738cB626A1720Af7038B8DcDb6a42a0
// Carol=cd56123D0c5D6C1Ba4D39367b88cba61D93F5405
// rid=rid1000001

//cmd='thetacli tx reserve --chain="privatenet" --async --from='$Alice' --fund='$rfund' --collateral='$rcoll' --duration='$rfdurationblocks' --resource_ids='$rid' --seq='$ans' --password=qwertyuiop'

func main() {

	endpoint := "https://theta-dev-theta-privatenet.cfapps.eu10.hana.ondemand.com/rpc"

	viper.Set("remoteRPCEndpoint", endpoint)
	//address := "0x2E833968E5bB786Ae419c4d13189fB081Cc43bab"

	// address := tx.Alice

	// This will cause the MTA deploy to "fail" on first attempt of this module
	//   because it takes more time for the privatenet node to get started and
	//   start handling connections
	//
	// Normally you'd be just be building the client side and connecting to the Theta mainnet
	//
	// output := query.Account(address)
	// fmt.Println(output)
	date_test()
	sqlite_init()

	fileServer := http.FileServer(http.Dir("./static"))
	http.Handle("/", fileServer)

	http.HandleFunc("/offchain", indexHandler)

	http.HandleFunc("/offchain/links", linksHandler)

	http.HandleFunc("/offchain/form", formHandler)

	http.HandleFunc("/offchain/acct", acctHandler)

	http.HandleFunc("/offchain/reserve", reserveHandler)

	http.HandleFunc("/offchain/payment", paymentHandler)

	viper.SetDefault("port", "8080")
	viper.AutomaticEnv()
	port := viper.GetString("port")
	fmt.Printf("Starting server at port %s\n", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}
