package com.company.justjava.sboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/* Remove comment if Hana database support is enabled.
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.json.JSONArray;
import org.json.JSONObject;
import java.sql.DriverManager;
*/

@Controller
@EnableAutoConfiguration
public class HelloController {

  @RequestMapping(value = "/", method = RequestMethod.GET, produces = "text/plain")
  @ResponseBody
  String home() {
    StringBuilder builder = new StringBuilder();
    builder.append("Hello World !!");

    /* Remove comment if Hana database support is enabled.
    builder.append("\n\nJDBC connection available: ");
    try {
      Connection conn = getConnection();
      if (conn != null) {
        builder.append("yes");
        builder.append("\n\nCurrent Hana DB user:\n");
        String userName = getCurrentUser(conn);
        builder.append(userName);
        builder.append("\n\nCurrent Hana schema:\n");
        builder.append(getCurrentSchema(conn));
      } else {
        builder.append("no");
      }
    } catch (SQLException e) {
      builder.append("no");
    }
    */

    return builder.toString();
  }

  /*  Remove comment if Hana database support is enabled.
  private String getCurrentUser(Connection conn) throws SQLException {
    String currentUser = "";
    PreparedStatement prepareStatement = conn.prepareStatement("SELECT CURRENT_USER \"current_user\" FROM DUMMY;");
    ResultSet resultSet = prepareStatement.executeQuery();
    int column = resultSet.findColumn("current_user");
    while (resultSet.next()) {
      currentUser += resultSet.getString(column);
    }
    return currentUser;
  }

  private String getCurrentSchema(Connection conn) throws SQLException {
    String currentSchema = "";
    PreparedStatement prepareStatement = conn.prepareStatement("SELECT CURRENT_SCHEMA \"current_schema\" FROM DUMMY;");
    ResultSet resultSet = prepareStatement.executeQuery();
    int column = resultSet.findColumn("current_schema");
    while (resultSet.next()) {
      currentSchema += resultSet.getString(column);
    }
    return currentSchema;
  }

  private Connection getConnection() {
    Connection conn = null;
    String DB_USERNAME = "";
    String DB_PASSWORD = "";
    String DB_HOST = "";
    String DB_PORT = "";

    try {
        JSONObject obj = new JSONObject(System.getenv("VCAP_SERVICES"));
        JSONArray arr = obj.getJSONArray("hana");
        DB_USERNAME = arr.getJSONObject(0).getJSONObject("credentials").getString("user");
        DB_PASSWORD = arr.getJSONObject(0).getJSONObject("credentials").getString("password");
        DB_HOST = arr.getJSONObject(0).getJSONObject("credentials").getString("host").split(",")[0];
        DB_PORT = arr.getJSONObject(0).getJSONObject("credentials").getString("port");
        String DB_READ_CONNECTION_URL = "jdbc:sap://" + DB_HOST + ":" + DB_PORT;

        conn = (Connection) DriverManager.getConnection(DB_READ_CONNECTION_URL, DB_USERNAME, DB_PASSWORD);
    } catch (Exception e) {
        System.out.println("Connection Error");
    }

    return conn;
  }
  */

  public static void main(String[] args) throws Exception {
    SpringApplication.run(HelloController.class, args);
  }
}
