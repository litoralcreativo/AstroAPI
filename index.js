const express = require("express");
const app = express();
const importData = require("./north.json");
let port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Astrological API")
})

app.get("/all_data", (req, res) => {
    res.send(importData);
})

app.get('/lat:id/h:hour/m:min', (req, res) => {
    const _h = req.params.hour;
    const _m = req.params.min;
    const _t = parseInt(_h)*60 + parseInt(_m);
    let t = parseInt(_t);
    const latObj = importData[req.params.id];
    switch (t%4){
        case 1:
            t --;
            break;
        case 2:
            t -= 2;
            break;
        case 3:
            t ++;
    }
    let h = Math.floor(t/60);
    let m = t - h*60;
    let _asc = latObj[t.toString()];
    let ascendent = "";

    if (ascendent.includes("a")){

    } else if (_asc.includes("a")) {
        ascendent = "Aries";
    } else if (_asc.includes("b")) {
        ascendent = "Taurus";
    } else if (_asc.includes("c")) {
        ascendent = "Gemini";
    } else if (_asc.includes("d")) {
        ascendent = "Cancer";
    } else if (_asc.includes("e")) {
        ascendent = "Leo";
    } else if (_asc.includes("f")) {
        ascendent = "Virgo";
    } else if (_asc.includes("g")) {
        ascendent = "Libra";
    } else if (_asc.includes("h")) {
        ascendent = "Scorpius";
    } else if (_asc.includes("i")) {
        ascendent = "Sagittarius";
    } else if (_asc.includes("j")) {
        ascendent = "Capricornus";
    } else if (_asc.includes("k")) {
        ascendent = "Aquarius";
    } else if (_asc.includes("l")) {
        ascendent = "Pisces";
    } else {
        ascendent = "Undefined";
    }


    const result = {
        "latitud": latObj["Latitud"],
        "time": _h+":"+_m,
        "time%4": h+":"+ m,
        "min%4": t,
        "ascendent_pos": latObj[t.toString()],
        "ascendent": ascendent}
    res.send(result);
})

app.get('/lat:id', (req, res) => {
    const latObj = importData[req.params.id];
    res.send(latObj)
})

app.listen(port, () => {
    console.log(`Example app is listening at port http://localhost:${port}`);
})