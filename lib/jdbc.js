/* jshint node: true */
"use strict";
var Pool = require("./pool");
var jinst = require('./jinst');
var java = jinst.getInstance();

function JDBC(config) {
  Pool.call(this, config);
}

JDBC.prototype = Object.create(Pool.prototype);
JDBC.prototype.constructor = JDBC;

jinst.events.once('initialized', function onInitialized() {
  JDBC.Types = (function () {
    var _types = {};

    _types.BIT           = java.getStaticFieldValue("java.sql.Types", "BIT");
    _types.TINYINT       = java.getStaticFieldValue("java.sql.Types", "TINYINT");
    _types.SMALLINT      = java.getStaticFieldValue("java.sql.Types", "SMALLINT");
    _types.INTEGER       = java.getStaticFieldValue("java.sql.Types", "INTEGER");
    _types.BIGINT        = java.getStaticFieldValue("java.sql.Types", "BIGINT");
    _types.FLOAT         = java.getStaticFieldValue("java.sql.Types", "FLOAT");
    _types.REAL          = java.getStaticFieldValue("java.sql.Types", "REAL");
    _types.DOUBLE        = java.getStaticFieldValue("java.sql.Types", "DOUBLE");
    _types.NUMERIC       = java.getStaticFieldValue("java.sql.Types", "NUMERIC");
    _types.DECIMAL       = java.getStaticFieldValue("java.sql.Types", "DECIMAL");
    _types.CHAR          = java.getStaticFieldValue("java.sql.Types", "CHAR");
    _types.VARCHAR       = java.getStaticFieldValue("java.sql.Types", "VARCHAR");
    _types.LONGVARCHAR   = java.getStaticFieldValue("java.sql.Types", "LONGVARCHAR");
    _types.DATE          = java.getStaticFieldValue("java.sql.Types", "DATE");
    _types.TIME          = java.getStaticFieldValue("java.sql.Types", "TIME");
    _types.TIMESTAMP     = java.getStaticFieldValue("java.sql.Types", "TIMESTAMP");
    _types.BINARY        = java.getStaticFieldValue("java.sql.Types", "BINARY");
    _types.VARBINARY     = java.getStaticFieldValue("java.sql.Types", "VARBINARY");
    _types.LONGVARBINARY = java.getStaticFieldValue("java.sql.Types", "LONGVARBINARY");
    _types.NULL          = java.getStaticFieldValue("java.sql.Types", "NULL");
    _types.OTHER         = java.getStaticFieldValue("java.sql.Types", "OTHER");

    var javaVersion = java.callStaticMethodSync('java.lang.System', 'getProperty', 'java.version');
    var jvi = /([0-9]+)\.([0-9]+)\.([0-9]+)(?:_([0-9]+))?(?:-(.+))?/.exec(javaVersion);

    // since 1.2
    if (jvi[2] >= 2) {
      _types.JAVA_OBJECT = java.getStaticFieldValue("java.sql.Types", "JAVA_OBJECT");
      _types.DISTINCT    = java.getStaticFieldValue("java.sql.Types", "DISTINCT");
      _types.STRUCT      = java.getStaticFieldValue("java.sql.Types", "STRUCT");
      _types.ARRAY       = java.getStaticFieldValue("java.sql.Types", "ARRAY");
      _types.BLOB        = java.getStaticFieldValue("java.sql.Types", "BLOB");
      _types.CLOB        = java.getStaticFieldValue("java.sql.Types", "CLOB");
      _types.REF         = java.getStaticFieldValue("java.sql.Types", "REF");
    }

    // since 1.4
    if (jvi[2] >= 4) {
      _types.DATALINK = java.getStaticFieldValue("java.sql.Types", "DATALINK");
      _types.BOOLEAN  = java.getStaticFieldValue("java.sql.Types", "BOOLEAN");
    }

    // since 1.6
    if (jvi[2] >= 6) {
      _types.ROWID        = java.getStaticFieldValue("java.sql.Types", "ROWID");
      _types.NCHAR        = java.getStaticFieldValue("java.sql.Types", "NCHAR");
      _types.NVARCHAR     = java.getStaticFieldValue("java.sql.Types", "NVARCHAR");
      _types.LONGNVARCHAR = java.getStaticFieldValue("java.sql.Types", "LONGNVARCHAR");
      _types.NCLOB        = java.getStaticFieldValue("java.sql.Types", "NCLOB");
      _types.SQLXML       = java.getStaticFieldValue("java.sql.Types", "SQLXML");
    }

    // since 1.8
    if (jvi[2] >= 8) {
      _types.REF_CURSOR              = java.getStaticFieldValue("java.sql.Types", "REF_CURSOR");
      _types.TIME_WITH_TIMEZONE      = java.getStaticFieldValue("java.sql.Types", "TIME_WITH_TIMEZONE");
      _types.TIMESTAMP_WITH_TIMEZONE = java.getStaticFieldValue("java.sql.Types", "TIMESTAMP_WITH_TIMEZONE");
    }

    return _types;
  })();
});

module.exports = JDBC;
