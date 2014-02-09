function path(url) {
    return /(.*\/)[^\/]*$/gi.exec(url)[1];
}

$(function () {
    // init page controls



    $("#dimensions").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        value: "common-bootstrap",
        dataSource: [
            { text: "Default", value: "common" },
            { text: "Bootstrap", value: "common-bootstrap" }
        ],
        change: function(e) {
            var commonLink = Application.getCurrentCommonLink();
            Application.updateLink(commonLink, Application.getCommonUrl(this.value()));
        }
    });

    $("#theme").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        value: "bootstrap",
        dataSource: [
            { text: "Default", value: "default" },
            { text: "Blue Opal", value: "blueopal" },
            { text: "Bootstrap", value: "bootstrap" },
            { text: "Silver", value: "silver" },
            { text: "Uniform", value: "uniform" },
            { text: "Metro", value: "metro" },
            { text: "Black", value: "black" },
            { text: "Metro Black", value: "metroblack" },
            { text: "High Contrast", value: "highcontrast" },
            { text: "Moonlight", value: "moonlight" },
            { text: "Flat", value: "flat" }
        ],
        change: function(e) {
            theme = this.value();
            Application.changeTheme(theme, true);
            initCharts(theme);
        }
    });

    function changeFontSize(e) {
        var value = $("#font-size").kendoDropDownList("value");

        $("body").css("font-size", value + "px");
    }

    $("#font-size").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        value: 14,
        height: 204,
        dataSource: [
            { text: "10px", value: 10 },
            { text: "12px", value: 12 },
            { text: "14px", value: 14 },
            { text: "16px", value: 16 },
            { text: "18px", value: 18 },
            { text: "20px", value: 20 }
        ],
        change: changeFontSize
    });

    changeFontSize();

    $("#theme-list, #dimensions-list, #font-size-list").addClass("ra-list");

    $("#configure").on("click", function(e) {
        $("#configurator-wrap").toggleClass("hidden-xs");
        e.preventDefault();
    });

    // init sample widgets
    var serviceBaseUrl = "http://demos.telerik.com/kendo-ui/service";

    $("#menu").kendoMenu();

    function resizeTabStripContent() {
        kendo.resize("#tabstrip");
    }

    $("#tabstrip").kendoTabStrip({
        animation: {
            open: { effects: "fadeIn" }
        },
        activate: resizeTabStripContent
    });

    // resize nested charts when window resizes
    $(window).resize(resizeTabStripContent);

    



    $("#orders").kendoGrid({
        dataSource: {
            type: "odata",
            transport: {
                read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
            },
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            pageSize: 10
        },
        scrollable: false,
        sortable: true,
        groupable: true,
        pageable: { buttonCount: 4 },
        columns: [
            { field: "OrderID", width: "70px" },
            { field: "ShipCountry", title:"Ship Country", width: "20%" },
            { field: "ShipAddress", title:"Ship Address" }
        ]
    });

    $("#schedule").kendoScheduler({
        date: new Date("2013/6/13"),
        startTime: new Date("2013/6/13 07:00 AM"),
        endTime: new Date("2013/6/13 08:00 PM"),
        views: [
            { type: "day", selected: true },
            "week",
            "month"
        ],
        editable: false,
        timezone: "Etc/UTC",
        dataSource: {
            batch: true,
            transport: {
                read: {
                    url: serviceBaseUrl + "/meetings",
                    dataType: "jsonp"
                },
                update: {
                    url: serviceBaseUrl + "/meetings/update",
                    dataType: "jsonp"
                },
                create: {
                    url: serviceBaseUrl + "/meetings/create",
                    dataType: "jsonp"
                },
                destroy: {
                    url: serviceBaseUrl + "/meetings/destroy",
                    dataType: "jsonp"
                },
                parameterMap: function(options, operation) {
                    if (operation !== "read" && options.models) {
                        return {models: kendo.stringify(options.models)};
                    }
                }
            },
            schema: {
                model: {
                    id: "meetingID",
                    fields: {
                        meetingID: { from: "MeetingID", type: "number" },
                        title: { from: "Title", defaultValue: "No title", validation: { required: true } },
                        start: { type: "date", from: "Start" },
                        end: { type: "date", from: "End" },
                        startTimezone: { from: "StartTimezone" },
                        endTimezone: { from: "EndTimezone" },
                        description: { from: "Description" },
                        recurrenceId: { from: "RecurrenceID" },
                        recurrenceRule: { from: "RecurrenceRule" },
                        recurrenceException: { from: "RecurrenceException" },
                        roomId: { from: "RoomID", nullable: true },
                        atendees: { from: "Atendees", nullable: true },
                        isAllDay: { type: "boolean", from: "IsAllDay" }
                    }
                }
            }
        }
    });

    $("#listview").kendoListView({
        dataSource: {
            data: [
                { id: 1, title: "Sunrise", description: "And what a great July morning it was..." },
                { id: 2, title: "Fisherman", description: "Fishing on the north shore" },
                { id: 3, title: "Green Forest", description: "Summer is everywhere" },
                { id: 4, title: "Cactus", description: "A yellow one..." },
                { id: 5, title: "Moss", description: "Nice mossy green" },
                { id: 6, title: "Red Boat", description: "In the middle of nowhere" },
                { id: 7, title: "Country Road", description: "On my way home" },
                { id: 8, title: "Bloom", description: "Cherry blossoms in full bloom" },
                { id: 9, title: "San Francisco", description: "San Francisco by sunset" },
                { id: 10, title: "Peaks", description: "Was a great holiday" },
                { id: 11, title: "Thunderstorm", description: "Midnight storm on its way" },
                { id: 12, title: "Leafs", description: "Autumn leafs on the patio" }
            ]
        },
        template: $("#listview-template").html()
    });

    $("#panelbar").kendoPanelBar();

    $("#example .form-widgets")
        .find("select:not([multiple])").kendoDropDownList().end()
        .find("select[multiple]").kendoMultiSelect().end()
        .find("input:not([type])").addClass("k-textbox").end()
        .find("input[type=date]").kendoDatePicker().end()
        .find("input[type=number]").kendoNumericTextBox({
            format: "0 years"
        });

    $("#example textarea").kendoEditor({
        tools: [
            "formatting",
            "bold", "italic", "underline",
            "strikethrough", "subscript", "superscript",
            "justifyLeft", "justifyCenter", "justifyRight", "justifyFull",
            "insertUnorderedList", "insertOrderedList", "indent", "outdent"
        ]
    });

});