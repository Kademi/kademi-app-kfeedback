controllerMappings
    .adminController()
    .path("/kfeedback/")
    .enabled(true)
    .defaultView(views.templateView("kfeedback/index.html"))
    .build();

controllerMappings
    .adminController()
    .path("/kfeedback/feedbacks/")
    .enabled(true)
    .addMethod("GET", "getFeedbackBySurvey")
    .build();

controllerMappings
    .adminController()
    .path("/kfeedback/surveys/")
    .enabled(true)
    .addMethod("GET", "getAllSurveys")
    .addMethod("POST", "createSurvey")
    .build();

/**
 * front end mapping
 */
controllerMappings
    .websiteController()
    .path("/send-feedback/")
    .enabled(true)
    .isPublic(true)
    .defaultView(views.templateView("kfeedback/index.html"))
    .build();

controllerMappings
    .websiteController()
    .path("/send-feedback-api/")
    .enabled(true)
    .isPublic(true)
    .addMethod("GET", "getSurvey")
    .addMethod("POST", "createFeedback")
    .postPriviledge("READ_CONTENT")
    .build();
    
controllerMappings.addNodeType("kfeedbackSubmittedGoal", "kfeedback/jb/kfeedbackSubmittedGoalNode.js");

controllerMappings.addComponent( "kfeedback", "kfeedbackEmail", "email", "Shows emoticons with links");

controllerMappings.addTextJourneyField( "kfeedback-result", "KFeedback result", "getLastFeedbackResult"); // see function below


function getLastFeedbackResult(lead, exitingNode, funnel, vars) {
    var jsonDB = page.find(JSON_DB);
    var db = jsonDB.find(dbName);
    
    // find most recent response from this profile
    var searchResults = db.search(JSON.stringify({
        "term" : { "profileId" : lead.profile.id },
        "sort" : { "created" : {"order" : "desc"}}
    }));
    flog("results", searchResults);
    flog("num hits", searchResults.hits.hits.length);
    // TODO
    return "happy";
}

function initApp(orgRoot, webRoot, enabled){
    log.info("initApp: orgRoot={}", orgRoot);

    var dbs = orgRoot.find(JSON_DB);
    if (isNull(dbs)) {
        page.throwNotFound('KongoDB is disabled. Please enable it for continue with this app!');
        return;
    }
    var db = dbs.child(dbName);

    if (isNull(db)) {
        log.info('{} does not exist!', dbTitle);

        db = dbs.createDb(dbName, dbTitle, dbName);

        if (!db.allowAccess) {
            setAllowAccess(db, true);
        }
    }
}

function setAllowAccess(db, allowAccess) {
    transactionManager.runInTransaction(function () {
        db.setAllowAccess(allowAccess);
    });
}




