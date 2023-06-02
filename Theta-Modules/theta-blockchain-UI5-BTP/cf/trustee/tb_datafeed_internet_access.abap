FUNCTION TB_DATAFEED_INTERNET_ACCESS.
*"----------------------------------------------------------------------
*"*"Local Interface:
*"  IMPORTING
*"     VALUE(FEEDNAME) LIKE  VTB_DFDEST-RFEEDNAME
*"     VALUE(HISTORY) LIKE  VTB_DFCU-RUPDHIST
*"     VALUE(UPDATE) LIKE  VTB_DFCU-RUPDHIST
*"     VALUE(BLANKSTOCRLF) TYPE  VTB_DFDEST-BLANKSTOCRLF DEFAULT 'X'
*"     VALUE(CLEAR_REQUEST_ENTITY_BODY) TYPE  BOOLEAN DEFAULT 'X'
*"  EXPORTING
*"     VALUE(E_MESSAGE_BUFFER) LIKE  VTB_MARKET-ERROR
*"  TABLES
*"      ANSWER STRUCTURE  VTB_DFANS
*"      REQUEST STRUCTURE  VTB_DFREQ
*"  EXCEPTIONS
*"      DATAFEED_FAILURE
*"      COMMUNICATION_FAILURE
*"----------------------------------------------------------------------


************************************************************************
* Declarations

  CONSTANTS: RWORKMODUS LIKE VTB_DFDEST-RWORKMODUS VALUE '1'.

* Temp answer table
  DATA: BEGIN OF TEMP_ANSWER OCCURS 100.
          INCLUDE STRUCTURE VTB_DFANS.
  DATA: END OF TEMP_ANSWER.

  DATA: HLP_MESSAGE_BUFFER(50) TYPE C.

* Request tables
  DATA: BEGIN OF REQUEST_HEADERS OCCURS 100,
           LINE LIKE TLINE-TDLINE.
  DATA: END OF REQUEST_HEADERS.

  DATA: BEGIN OF REQUEST_ENTITY_BODY OCCURS 100,
           LINE LIKE VTBDFIN-LINE.
  DATA: END OF REQUEST_ENTITY_BODY.

* Response tables
  DATA: BEGIN OF RESPONSE_HEADERS OCCURS 10,
           LINE LIKE TLINE-TDLINE.
  DATA: END OF RESPONSE_HEADERS.

  DATA: BEGIN OF RESPONSE_ENTITY_BODY OCCURS 10,
           LINE LIKE VTB_DFANS,
           NEWLINECHAR(2) TYPE C,
         END   OF RESPONSE_ENTITY_BODY.

* status code RFC1945
  DATA: STATUS_CODE(3) TYPE C.

* version code
  DATA: VERSION(3) TYPE C.
  DATA: VERSION_FLAG TYPE C VALUE ' '.

* length of response body
  DATA: RESPONSE_ENTITY_BODY_LENGTH TYPE I.
  DATA: REQUEST_ENTITY_BODY_LENGTH  TYPE I.

************************************************************************
* Initialization

  INTERNET_ACCESS = 'X'.
  CLEAR: E_MESSAGE_BUFFER, HLP_MESSAGE_BUFFER.

  REFRESH: REQUEST_HEADERS, RESPONSE_HEADERS, REQUEST_ENTITY_BODY,
           RESPONSE_ENTITY_BODY, TEMP_ANSWER.

* read table vtb_dfdest for URI and PROXY Information.
  SELECT SINGLE * FROM  VTB_DFDEST CLIENT SPECIFIED
         WHERE  MANDT       = SY-MANDT
         AND    RFEEDNAME   = FEEDNAME
         AND    RWORKMODUS  = RWORKMODUS.

************************************************************************
* Implementation


************************************************************************
* fill HTTP request page header
  REQUEST_HEADERS-LINE =               "/ HTML version 3.2
     'content-type: text/plain'.       "#EC *
  APPEND REQUEST_HEADERS.

************************************************************************
* fill HTTP request page body

* CREATE HTML Request Page Header

  REQUEST_ENTITY_BODY-LINE =           "/ HTML version 3.2
     '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 //EN">'."#EC *
  APPEND REQUEST_ENTITY_BODY.

  REQUEST_ENTITY_BODY-LINE =
     '<html>'.                         "#EC *
  APPEND REQUEST_ENTITY_BODY.

  REQUEST_ENTITY_BODY-LINE =
     '<head>'.                         "#EC *
  APPEND REQUEST_ENTITY_BODY.

* REQUEST Format
  REQUEST_ENTITY_BODY-LINE =
  '<title>SAP Market Data Datafeed Interface Version 1.0</title>'."#EC *
  APPEND REQUEST_ENTITY_BODY.

  CONCATENATE
  '<meta name="SAP_Internet_Market_Data_Request_Format_Version" '"#EC *
  ' content="text/html 1.0">'          "#EC
                                 "/ versioning of market data format
    INTO REQUEST_ENTITY_BODY-LINE.
  APPEND REQUEST_ENTITY_BODY.

*  table description format for REQUESTS
  REQUEST_ENTITY_BODY-LINE =
    '<meta name="TableRow1" content="RINID1    Instrument Name">'."#EC *
  APPEND REQUEST_ENTITY_BODY.

  REQUEST_ENTITY_BODY-LINE =
    '<meta name="TableRow1_Length" content="20">'."#EC *
  APPEND REQUEST_ENTITY_BODY.

  REQUEST_ENTITY_BODY-LINE =
    '<meta name="TableRow2" content="RINID2    Data Source">'."#EC *
  APPEND REQUEST_ENTITY_BODY.

  REQUEST_ENTITY_BODY-LINE =
    '<meta name="TableRow2_Length" content="15">'."#EC *
  APPEND REQUEST_ENTITY_BODY.

  REQUEST_ENTITY_BODY-LINE =
'<meta name="TableRow3" content="SPRPTY    Instrument Property">'."#EC *
  APPEND REQUEST_ENTITY_BODY.

  REQUEST_ENTITY_BODY-LINE =
    '<meta name="TableRow3_Length" content="15">'."#EC *
  APPEND REQUEST_ENTITY_BODY.

  CONCATENATE
    '<meta name="TableRow4" content="DFROMDATE'"#EC *
    ' Historical Data Start Date">'    "#EC *
    INTO REQUEST_ENTITY_BODY-LINE.
  APPEND REQUEST_ENTITY_BODY.

  REQUEST_ENTITY_BODY-LINE =
    '<meta name="TableRow4_Length" content="8">'."#EC *
  APPEND REQUEST_ENTITY_BODY.

  CONCATENATE
     '<meta name="TableRow5" content="DFROMTIME'"#EC *
     ' Historical Data Start Time">'   "#EC *
     INTO REQUEST_ENTITY_BODY-LINE.
  APPEND REQUEST_ENTITY_BODY.

  REQUEST_ENTITY_BODY-LINE =
    '<meta name="TableRow5_Length" content="6">'."#EC *
  APPEND REQUEST_ENTITY_BODY.

  CONCATENATE
     '<meta name="TableRow6" content="DTODATE'"#EC *
     ' Historical Data End Date">'     "#EC *
     INTO REQUEST_ENTITY_BODY-LINE.
  APPEND REQUEST_ENTITY_BODY.

  REQUEST_ENTITY_BODY-LINE =
    '<meta name="TableRow6_Length" content="8">'."#EC *
  APPEND REQUEST_ENTITY_BODY.

  CONCATENATE
     '<meta name="TableRow7" content="DTOTIME'"#EC *
     ' Historical Data End Time">'     "#EC *
     INTO REQUEST_ENTITY_BODY-LINE.
  APPEND REQUEST_ENTITY_BODY.

  REQUEST_ENTITY_BODY-LINE =
    '<meta name="TableRow7_Length" content="6">'."#EC *
  APPEND REQUEST_ENTITY_BODY.

  REQUEST_ENTITY_BODY-LINE =
'<meta name="TableRow8" content="UNAME     SAP User Requesting">'."#EC *
  APPEND REQUEST_ENTITY_BODY.

  REQUEST_ENTITY_BODY-LINE =
    '<meta name="TableRow8_Length" content="12">'."#EC *
  APPEND REQUEST_ENTITY_BODY.

* ANSWER Format

  CONCATENATE
   '<meta name="SAP_Internet_Market_Data_Answer_Format_Version" '"#EC *
   ' content="text/plain 1.0">'        "#EC *
                                 "/ versioning of market data format
    INTO REQUEST_ENTITY_BODY-LINE.
  APPEND REQUEST_ENTITY_BODY.

*  table description format for REQUESTS
  REQUEST_ENTITY_BODY-LINE =
    '<meta name="TableRow1" content="RINID1    Instrument Name">'."#EC *
  APPEND REQUEST_ENTITY_BODY.

  REQUEST_ENTITY_BODY-LINE =
    '<meta name="TableRow1_Length" content="20">'."#EC *
  APPEND REQUEST_ENTITY_BODY.

  REQUEST_ENTITY_BODY-LINE =
    '<meta name="TableRow2" content="RINID2    Data Source">'."#EC *
  APPEND REQUEST_ENTITY_BODY.

  REQUEST_ENTITY_BODY-LINE =
    '<meta name="TableRow2_Length" content="15">'."#EC *
  APPEND REQUEST_ENTITY_BODY.

  REQUEST_ENTITY_BODY-LINE =
'<meta name="TableRow3" content="SPRPTY    Instrument Property">'."#EC *
  APPEND REQUEST_ENTITY_BODY.

  REQUEST_ENTITY_BODY-LINE =
    '<meta name="TableRow3_Length" content="15">'."#EC *
  APPEND REQUEST_ENTITY_BODY.

  CONCATENATE
    '<meta name="TableRow4" content="SSTATS'"#EC *
    ' Request Status: Blanks, if ok ">'"#EC *
    INTO REQUEST_ENTITY_BODY-LINE.
  APPEND REQUEST_ENTITY_BODY.

  REQUEST_ENTITY_BODY-LINE =
    '<meta name="TableRow4_Length" content="2">'."#EC *
  APPEND REQUEST_ENTITY_BODY.

  CONCATENATE
     '<meta name="TableRow5" content="ERROR'"#EC *
     ' Error Message relating to STATUS ">'"#EC *
     INTO REQUEST_ENTITY_BODY-LINE.
  APPEND REQUEST_ENTITY_BODY.

  REQUEST_ENTITY_BODY-LINE =
    '<meta name="TableRow5_Length" content="80">'."#EC *
  APPEND REQUEST_ENTITY_BODY.

  CONCATENATE
     '<meta name="TableRow6" content="RSUPID'"#EC *
     ' Data source">'                  "#EC *
     INTO REQUEST_ENTITY_BODY.
  APPEND REQUEST_ENTITY_BODY.

  REQUEST_ENTITY_BODY-LINE =
    '<meta name="TableRow6_Length" content="10">'."#EC *
  APPEND REQUEST_ENTITY_BODY.

  CONCATENATE
     '<meta name="TableRow7" content="RCONID'"#EC *
     ' Contributor Identification">'   "#EC *
     INTO REQUEST_ENTITY_BODY-LINE.
  APPEND REQUEST_ENTITY_BODY.

  REQUEST_ENTITY_BODY-LINE =
    '<meta name="TableRow7_Length" content="10">'."#EC *
  APPEND REQUEST_ENTITY_BODY.

  CONCATENATE
     '<meta name="TableRow8" content="RCONCN'"#EC *
     ' Contributor Country Identification">'"#EC *
     INTO REQUEST_ENTITY_BODY-LINE.
  APPEND REQUEST_ENTITY_BODY.

  REQUEST_ENTITY_BODY-LINE =
    '<meta name="TableRow8_Length" content="5">'."#EC *
  APPEND REQUEST_ENTITY_BODY.

  CONCATENATE
     '<meta name="TableRow9" content="DATE'"#EC *
     ' Date in YYYYMMDD Format">'      "#EC *
     INTO REQUEST_ENTITY_BODY-LINE.
  APPEND REQUEST_ENTITY_BODY.

  REQUEST_ENTITY_BODY-LINE =
    '<meta name="TableRow9_Length" content="8">'."#EC *
  APPEND REQUEST_ENTITY_BODY.

  CONCATENATE
     '<meta name="TableRow10" content="TIME'"#EC *
     ' Time in HHMMSS Format">'        "#EC *
     INTO REQUEST_ENTITY_BODY-LINE.
  APPEND REQUEST_ENTITY_BODY.

  REQUEST_ENTITY_BODY-LINE =
    '<meta name="TableRow10_Length" content="6">'."#EC *
  APPEND REQUEST_ENTITY_BODY.

  CONCATENATE
     '<meta name="TableRow11" content="VALUE'"#EC *
     ' Value with decimal point optionally">'"#EC *
     INTO REQUEST_ENTITY_BODY-LINE.
  APPEND REQUEST_ENTITY_BODY.

  REQUEST_ENTITY_BODY-LINE =
    '<meta name="TableRow11_Length" content="20">'."#EC *
  APPEND REQUEST_ENTITY_BODY.

  CONCATENATE
     '<meta name="TableRow12" content="CURRENCY'"#EC *
     ' Currency Information for security prices">'"#EC *
     INTO REQUEST_ENTITY_BODY-LINE.
  APPEND REQUEST_ENTITY_BODY.

  REQUEST_ENTITY_BODY-LINE =
    '<meta name="TableRow12_Length" content="5">'."#EC *
  APPEND REQUEST_ENTITY_BODY.

  CONCATENATE
     '<meta name="TableRow13" content="MKIND'"#EC *
     ' Market Indicator for security prices">'"#EC *
     INTO REQUEST_ENTITY_BODY-LINE.
  APPEND REQUEST_ENTITY_BODY.

  REQUEST_ENTITY_BODY-LINE =
    '<meta name="TableRow13_Length" content="5">'."#EC *
  APPEND REQUEST_ENTITY_BODY.

  CONCATENATE
     '<meta name="TableRow14" content="CFFACT'"#EC *
     ' Currency: From factor">'        "#EC *
     INTO REQUEST_ENTITY_BODY-LINE.
  APPEND REQUEST_ENTITY_BODY.

  REQUEST_ENTITY_BODY-LINE =
    '<meta name="TableRow14_Length" content="7">'."#EC *
  APPEND REQUEST_ENTITY_BODY.

  CONCATENATE
     '<meta name="TableRow15" content="CTFACT'"#EC *
     ' Currency: To factor">'          "#EC *
     INTO REQUEST_ENTITY_BODY-LINE.
  APPEND REQUEST_ENTITY_BODY.

  REQUEST_ENTITY_BODY-LINE =
    '<meta name="TableRow15_Length" content="7">'."#EC *
  APPEND REQUEST_ENTITY_BODY.

  CONCATENATE
     '<meta name="TableRow16" content="UNAME'"#EC *
     ' Currency: User Name">'          "#EC *
     INTO REQUEST_ENTITY_BODY-LINE.
  APPEND REQUEST_ENTITY_BODY.

  REQUEST_ENTITY_BODY-LINE =
    '<meta name="TableRow16_Length" content="12">'."#EC *
  APPEND REQUEST_ENTITY_BODY.

  CONCATENATE
     '<meta name="TableRow17" content="RZUSATZ'"#EC *
     ' Volatilities: Number of Days">' "#EC *
     INTO REQUEST_ENTITY_BODY-LINE.
  APPEND REQUEST_ENTITY_BODY.

  REQUEST_ENTITY_BODY-LINE =
    '<meta name="TableRow17_Length" content="10">'."#EC *
  APPEND REQUEST_ENTITY_BODY.

  CONCATENATE
     '<meta name="TableRow18" content="NEWLINE'"#EC *
     ' Line Feed Character/Newline">'  "#EC *
     INTO REQUEST_ENTITY_BODY-LINE.
  APPEND REQUEST_ENTITY_BODY.

  REQUEST_ENTITY_BODY-LINE =
    '<meta name="TableRow18_Length" content="1">'."#EC *
  APPEND REQUEST_ENTITY_BODY.

*  table description format
  REQUEST_ENTITY_BODY-LINE =
     '</head>'.                        "#EC *
  APPEND REQUEST_ENTITY_BODY.

* CREATE HTML Request Page Body
  REQUEST_ENTITY_BODY =
     '<body>'.                         "#EC *
  APPEND REQUEST_ENTITY_BODY.

*    fill in request table, conversion if necessary
  LOOP AT REQUEST.
    WRITE: REQUEST TO REQUEST_ENTITY_BODY.
    APPEND REQUEST_ENTITY_BODY.
  ENDLOOP.

*    fill request end
  REQUEST_ENTITY_BODY =
     '</body>'.                        "#EC *
  APPEND REQUEST_ENTITY_BODY.

  REQUEST_ENTITY_BODY =
     '</html>'.                        "#EC *
  APPEND REQUEST_ENTITY_BODY.

* REQUEST_ENTITY_BODY_LENGTH setzen
*  number of lines
  DESCRIBE TABLE REQUEST_ENTITY_BODY LINES REQUEST_ENTITY_BODY_LENGTH.
* each line has max. 132 characters
  REQUEST_ENTITY_BODY_LENGTH = 132 * REQUEST_ENTITY_BODY_LENGTH.


* INTERNET ACCESS
* request/response to the internet .....

* move 'SAPHTTPA' to vtb_dfdest-rdest.  "/ Internet Destination
* clear vtb_dfdest-rdest.               "/ handled by http_get

  IF CLEAR_REQUEST_ENTITY_BODY IS NOT INITIAL.
    CLEAR   REQUEST_ENTITY_BODY.
    REFRESH REQUEST_ENTITY_BODY.
  ENDIF.

  CALL FUNCTION 'HTTP_GET'
       EXPORTING
            ABSOLUTE_URI                = VTB_DFDEST-URI
*         REQUEST_ENTITY_BODY_LENGTH  =
*           rfc_destination             = vtb_dfdest-rdest
* Local Proxy user, handled by SAP normally, here for test purposes only
*         proxy                       = 'proxy:8080'
*         proxy_user                  = 'username'
*         proxy_password              = 'password'
* external WEB server user
          USER                        = VTB_DFDEST-FOREIGN_USER
          PASSWORD                    = VTB_DFDEST-FOREIGN_PASSWD
          BLANKSTOCRLF                = BLANKSTOCRLF  "VTB_DFDEST-BLANKSTOCRLF
       IMPORTING
*         StatusCode laut RFC1945 normiert, liefert Fehler...
            STATUS_CODE                 = STATUS_CODE
            RESPONSE_ENTITY_BODY_LENGTH = RESPONSE_ENTITY_BODY_LENGTH
       TABLES
            REQUEST_ENTITY_BODY         =  REQUEST_ENTITY_BODY
            RESPONSE_ENTITY_BODY        =  RESPONSE_ENTITY_BODY
            RESPONSE_HEADERS            =  RESPONSE_HEADERS
            REQUEST_HEADERS             =  REQUEST_HEADERS
       EXCEPTIONS
            CONNECT_FAILED              = 1
            TIMEOUT                     = 2
            INTERNAL_ERROR              = 3
            TCPIP_ERROR                 = 4
            OTHERS                      = 5.

  IF SY-SUBRC <> 0.                    "/ no connection
* error handling!!!
    CASE SY-SUBRC.
      WHEN '1'.
        E_MESSAGE_BUFFER =
                     'Verbindungsaufbau misslungen'(890).
      WHEN '2'.
        E_MESSAGE_BUFFER =
                     'Timeout beim Verbindungsaufbau'(891).
      WHEN '3'.
        E_MESSAGE_BUFFER =
                     'Interner Fehler Verbindungsaufbau'(892).
      WHEN '4'.
        E_MESSAGE_BUFFER =
                     'TCP/IP-Fehler Verbindungsaufbau'(893).
      WHEN OTHERS.
        E_MESSAGE_BUFFER =
                     'HTTP-GET Fehler Verbindungsaufbau'(894).
    ENDCASE.
    EXIT.
  ELSEIF  STATUS_CODE <> '200'.        "/ connection ok, other problems
* error handling!!!
    LOOP AT RESPONSE_HEADERS.
      HLP_MESSAGE_BUFFER = RESPONSE_HEADERS-LINE.
                                       "/ first line contains error
      EXIT.
    ENDLOOP.
*     concatenate 'Fehler: '(910) status_code hlp_message_buffer
    MOVE HLP_MESSAGE_BUFFER TO E_MESSAGE_BUFFER.
    CONDENSE E_MESSAGE_BUFFER.
    EXIT.
  ELSE.
* everything was fine...
    REFRESH ANSWER.
    LOOP AT RESPONSE_ENTITY_BODY.
      IF VERSION_FLAG = ' '.
        VERSION = RESPONSE_ENTITY_BODY-LINE(3).
        CASE VERSION.
          WHEN '1.0'.
            VERSION_FLAG = CON_XON.
            CONTINUE.
          WHEN OTHERS.
            VERSION = '1.0'.
            VERSION_FLAG = CON_XON.
        ENDCASE.
      ENDIF.
      MOVE RESPONSE_ENTITY_BODY-LINE TO ANSWER.
      APPEND ANSWER.
    ENDLOOP.
  ENDIF.

* delete empty lines
  LOOP AT ANSWER WHERE RINID1 IS INITIAL
                   AND RINID2 IS INITIAL
                   AND SPRPTY IS INITIAL.
    DELETE ANSWER.
  ENDLOOP.

* find missing requests and build up error answer
  LOOP AT REQUEST.
    LOOP AT ANSWER WHERE RINID1 = REQUEST-RINID1
                     AND RINID2 = REQUEST-RINID2
                     AND SPRPTY = REQUEST-SPRPTY.
    ENDLOOP.
    IF SY-SUBRC NE 0.                  "/ no answer for request
      MOVE-CORRESPONDING REQUEST TO TEMP_ANSWER.
      TEMP_ANSWER-SSTATS = '99'.
      TEMP_ANSWER-ERROR  =
                     'Kurs nicht in Datafeed-Antwort enthalten'(888).
      APPEND TEMP_ANSWER.
    ENDIF.
  ENDLOOP.

* add missing entries to answer
  LOOP AT TEMP_ANSWER.
    MOVE-CORRESPONDING TEMP_ANSWER TO ANSWER.
    APPEND ANSWER.
  ENDLOOP.

* that´s it

ENDFUNCTION.