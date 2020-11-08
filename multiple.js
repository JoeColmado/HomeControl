
const { Boards, Led, Relay, Relays, Sensor, Switch } = require("johnny-five");

const ports = [
    { id: "A", port: "/dev/ttyUSB1" },
    { id: "B", port: "/dev/ttyUSB0" }
   ];
const boards = new Boards(ports);


boards.on("ready", () => {

    // Both "A" and "B" are initialized
    // (connected and available for communication)

    // Access them by their ID:

    const s1 = new Switch({
        pin: 12,
        board: boards.byId("B"),
    })
    s1.on("open", () => {
        supply_12.open();
        sw_1.open();

    })
    s1.on("close", () => {
        supply_12.close();
        sw_1.close();
    })

    const s2 = new Switch({
        pin: 11,
        board: boards.byId("B"),
    });
    s2.on("open", () => {
        sw_2.open();
    })
    s2.on("close", () => {
        sw_2.close();
    })
    const s3 = new Switch({
        pin: 8,
        board: boards.byId("B"),
    });
    s3.on("open", () => {
        sw_3.open();
        console.log("s3 open");
    })
    s3.on("close", () => {
        sw_3.close();
        console.log("s3 open");
    })
    const led = new Led({
        board: boards.byId("B"),
        pin: 9,
    });

    const ledRed = new Led({
        board: boards.byId("B"),
        pin: 5,
    });

    const ledGreen = new Led({
        board: boards.byId("B"),
        pin: 6,
    });

    const ledBlue = new Led({
        board: boards.byId("B"),
        pin: 10,
    });


    // let rgbLed = new Led.RGB({
    //     pins: {
    //         red: 6,
    //         green: 5,
    //         blue: 10
    //     },
    //     board: boards.byId("B"),

    // });
    // rgbLed.color("red");


    let supply_12 =new Relays([{
        pin: 9,
        board: boards.byId("A"),
        type: "NC",
    }, {
        pin: 10,
        board: boards.byId("A"),
        type: "NC",
        }]);

    let sw_1 = new Relays([{
        pin: 7,
        board: boards.byId("A"),
        type: "NC",
    }, {
        pin: 8,
        board: boards.byId("A"),
        type: "NC",
        }]);

    let sw_2 = new Relays([{
        pin: 5,
        board: boards.byId("A"),
        type: "NC",
    }, {
        pin: 6,
        board: boards.byId("A"),
        type: "NC",
        }]);

    let sw_3 = new Relays([{
        pin: 3,
        board: boards.byId("A"),
        type: "NC",
    }, {
        pin: 4,
        board: boards.byId("A"),
        type: "NC",
        }]);


    let pot_1 = new Sensor({
        pin: 2,
        board: boards.byId("B"),
        threshold: 4,
    })

    let pot_2 = new Sensor({
        pin: 3,
        board: boards.byId("B"),
        threshold: 4,
    });

    let pot_3 = new Sensor({
        pin: 4,
        board: boards.byId("B"),
        threshold: 4,
    });


    let pot_4 = new Sensor({
        pin: 5,
        board: boards.byId("B"),
        threshold: 4,
    });

    let pot_5 = new Sensor({
        pin: 6,
        board: boards.byId("B"),
        threshold: 4,
    });

    let pot_6 = new Sensor({
        pin: 7,
        board: boards.byId("B"),
        threshold: 4,
    });


    supply_12.open();
    // sw_1.open();
    // sw_2.open();
    // sw_3.open();

    pot_1.on("change", () => {
        console.log("pot__1");
        led.brightness(pot_1.scaleTo(0, 255));
    })
    pot_2.on("change", () => {
        console.log("pot_2");
        let pot_Value = pot_2.scaleTo(0, 255)
        led.strobe(pot_2.scaleTo(0, 255));
        led.brightness(pot_1.scaleTo(0, 255));

        if (pot_Value < 5) {
            led.stop(0);
            led.brightness(pot_1.scaleTo(0, 255));

        }

        // ledRed.brightness(pot_2.scaleTo(0, 255));

    })
    pot_3.on("change", () => {
    })
    pot_4.on("change", () => {
        ledRed.brightness(pot_4.scaleTo(0, 255));
        // console.log(pot_4.scaleTo(0, 255));
    })
    pot_5.on("change", () => {
        console.log(pot_5.scaleTo(0, 255));
        ledGreen.brightness(pot_5.scaleTo(0, 255));
    })
    pot_6.on("change", () => {
        ledBlue.brightness(pot_6.scaleTo(0, 255));
        console.log(pot_6.scaleTo(0, 255));
    })
    // led.fade(512, 2000);


    // rgbLed.intensity(30);

    // |this| is an array-like object containing references
    // to each initialized board.

});
