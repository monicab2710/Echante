package com.enchante.enchantetesting.extentReports;

import com.aventstack.extentreports.ExtentReports;

public class ExtentFactory {

    public static ExtentReports getInstance() {
        ExtentReports extent = new ExtentReports();
        extent.setSystemInfo("RestAssured Version", "5.1.1");
        extent.setSystemInfo("OS", "Windows");
        return extent;
    }
}
