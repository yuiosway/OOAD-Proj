const mongoose = require("mongoose");
const { Schema } = mongoose;

var studentSchema = new Schema({
    "personalInformation": new Schema({
        _id: false,
        "identification": new Schema({
            _id: false,
            "name": new Schema({
                _id: false,
                "firstName": {
                    "type": String
                },
                "middleName": {
                    "type": String
                },
                "lastName": {
                    "type": String
                },
                "fullName": {
                    "type": String
                },
                "prefix": {
                    "type": String
                }
            }),
            "ID": new Schema({
                _id: false,
                "governmentID": new Schema({
                    _id: false,
                    "GID_Name": {
                        "type": String
                    },
                    "value": {
                        "type": String
                    }
                }),
                "studentID": new Schema({
                    _id: false,
                    "SID_Name": {
                        "type": String
                    },
                    "value": {
                        "type": String
                    }
                })
            })
        }),
        "contact": new Schema({
            _id: false,
            "telephone": new Schema({
                _id: false,
                "phoneType": {
                    "type": String
                },
                "extension": {
                    "type": String
                },
                "phoneNumber": {
                    "type": Number
                }
            }),
            "address": new Schema({
                _id: false,
                "adressLine1": {
                    "type": String
                },
                "adressLine2": {
                    "type": String
                },
                "adressLine3": {
                    "type": String
                },
                "city": {
                    "type": String
                },
                "district": {
                    "type": String
                },
                "state": {
                    "type": String
                },
                "region": {
                    "type": String
                },
                "mandal": {
                    "type": String
                }
            }),
            "emailID": {
                "type": String
            }
        }),
        "demographic": new Schema({
            _id: false,
            "dateOfBirth": {
                "type": Date
            },
            "gender": {
                "type": String
            },
            "age": {
                "type": Number
            },
            "ageBand": {
                "type": String
            },
            "disability": {
                "type": String
            }
        }),
        "designation": {
            "type": String
        }
    }),
    "institution_ID": {
        "type": Schema.Types.ObjectId
    },
    "institution": new Schema({
        _id: false,
        "I_name": {
            "type": String
        },
        "type": {
            "type": String
        },
        "institution_ID": {
            "type": String
        },
        "roles": [
            new Schema({
                _id: false,
                "title": {
                    "type": String
                }
            })
        ],
        "class": {
            "type": Number
        },
        "semester": {
            "type": Number
        },
        "section": {
            "type": String
        },
        "branch": {
            "type": String
        },
        "year": {
            "type": String
        },
        "GPA": {
            "type": Number
        },
        "CGPA":{
            "type": Number
        }
    }),
    "organisation_ID": {
        "type": Schema.Types.ObjectId
    },
    "organisation": new Schema({
        _id: false,
        "O_name": {
            "type": String
        },
        "type": {
            "type": String
        },
        "organisation_ID": {
            "type": String
        },
        "roles": [
            new Schema({
                _id: false,
                "title": {
                    "type": String
                }
            })
        ]
    }),
    "schooling": [
        new Schema({
            _id: false,
            "institution_ID": {
                "type": Schema.Types.ObjectId
            },
            "S_institution": new Schema({
                _id: false,
                "S_I_name": {
                    "type": String
                },
                "type": {
                    "type": String
                }
            })
        })
    ],
    "courses": [
        new Schema({
            _id: false,
            "course_ID": {
                "type": Schema.Types.ObjectId
            },
            "course": new Schema({
                _id: false,
                "title": {
                    "type": String
                },
                "code": {
                    "type": String
                },
                "numOfPreviousAttempts": {
                    "type": Number
                },
                "credits": new Schema({
                    _id: false,
                    "total": {
                        "type": Number
                    },
                    "earned": {
                        "type": Number
                    }
                }),
                "result": {
                    "type": String
                }
            })
        })
    ],
    "assessments": [ 
        new Schema ({
            _id: false,
            "assessment_ID": {
                "type": Schema.Types.ObjectId
            },
            "assessment": new Schema({
                _id: false,
                "A_name": {
                    "type": String
                },
                "type": {
                    "type": String
                },
                "score": new Schema({
                    _id: false,
                    "max": {
                        "type": Number
                    },
                    "earned": {
                        "type": Number
                    }
                }),
                "date": {
                    "type": Date
                },
                
            })
        })
    ],
    "entities": [ 
        new Schema ({
            _id: false,
            "entity_ID": {
                "type": Schema.Types.ObjectId
            }
        })
    ],
    "__v": {
        "type": Number
    }
}, { timestamps: true });

var employeeSchema = new Schema({
    "personalInformation": new Schema({
        _id: false,
        "identification": new Schema({
            _id: false,
            "name": new Schema({
                _id: false,
                "firstName": {
                    "type": String
                },
                "middleName": {
                    "type": String
                },
                "lastName": {
                    "type": String
                },
                "fullName": {
                    "type": String
                },
                "prefix": {
                    "type": String
                }
            }),
            "ID": new Schema({
                _id: false,
                "governmentID": new Schema({
                    _id: false,
                    "GID_Name": {
                        "type": String
                    },
                    "value": {
                        "type": String
                    }
                }),
                "employeeID": new Schema({
                    _id: false,
                    "EID_Name": {
                        "type": String
                    },
                    "value": {
                        "type": String
                    }
                })
            })
        }),
        "contact": new Schema({
            _id: false,
            "telephone": new Schema({
                _id: false,
                "phoneType": {
                    "type": String
                },
                "extension": {
                    "type": String
                },
                "phoneNumber": {
                    "type": Number
                }
            }),
            "address": new Schema({
                _id: false,
                "adressLine1": {
                    "type": String
                },
                "adressLine2": {
                    "type": String
                },
                "adressLine3": {
                    "type": String
                },
                "city": {
                    "type": String
                },
                "district": {
                    "type": String
                },
                "state": {
                    "type": String
                },
                "region": {
                    "type": String
                },
                "mandal": {
                    "type": String
                }
            }),
            "emailID": {
                "type": String
            }
        }),
        "demographic": new Schema({
            _id: false,
            "dateOfBirth": {
                "type": Date
            },
            "gender": {
                "type": String
            },
            "age": {
                "type": Number
            },
            "ageBand": {
                "type": String
            }
        }),
        "designation": {
            "type": String
        }
    }),
    "employer": new Schema({
        _id: false,
        "institution_ID": {
            "type": Schema.Types.ObjectId
        },
        "institution": new Schema({
            _id: false,
            "I_name": {
                "type": String
            },
            "institution_ID": {
                "type": String
            },
            "positionTitle": {
                "type": String
            },
            "roles": [
                new Schema({
                    _id: false,
                    "title": {
                        "type": String
                    }
                })
            ],
            "hireDate": {
                "type": Date
            },
            "startDate": {
                "type": Date
            },
            "endDate": {
                "type": Date
            }
        }),
        "organisation_ID": {
            "type": Schema.Types.ObjectId
        },
        "organisation": new Schema({
            _id: false,
            "name": {
                "type": String
            },
            "organisation_ID": {
                "type": String
            },
            "positionTitle": {
                "type": String
            },
            "roles": [
                new Schema({
                    _id: false,
                    "title": {
                        "type": String
                    }
                })
            ],
            "hireDate": {
                "type": Date
            },
            "startDate": {
                "type": Date
            },
            "endDate": {
                "type": Date
            }
        })
    }),
    "assignments": [
        new Schema({
            _id: false,
            "employerID": {
                "type": Schema.Types.ObjectId
            },
            "role": {
                "type": String
            },
            "hireDate": {
                "type": Date
            },
            "startDate": {
                "type": Date
            },
            "endDate": {
                "type": Date
            },
            "information": new Schema({
                _id: false,
                "info": {
                    "type": String
                }
            })
        })
    ],
    "schooling": [
        new Schema({
            _id: false,
            "institution_ID": {
                "type": Schema.Types.ObjectId
            },
            "S_institution": new Schema({
                _id: false,
                "S_I_name": {
                    "type": String
                },
                "type": {
                    "type": String
                }
            })
        })
    ],
    "courses": [
        new Schema({
            _id: false,
            "course_ID": {
                "type": Schema.Types.ObjectId
            },
            "course" : {
                "title": {
                    "type": String
                },
                "code": {
                    "type": String
                }
            }
        })
    ],
    "entities": [ 
        new Schema ({
            _id: false,
            "entity_ID": {
                "type": Schema.Types.ObjectId
            }
        })
    ],
    "__v": {
        "type": Number
    }
}, { timestamps: true });

var institutionSchema = new Schema({
    "type": {
        "type": String
    },
    "identification": new Schema({
        _id: false,
        "name": {
            "type": String
        },
        "shortName": {
            "type": String
        }
    }),
    "contact": new Schema({
        _id: false,
        "telephone": new Schema({
            _id: false,
            "phoneType": {
                "type": String
            },
            "extension": {
                "type": String
            },
            "phoneNumber": {
                "type": Number
            }
        }),
        "address": new Schema({
            _id: false,
            "adressLine1": {
                "type": String
            },
            "adressLine2": {
                "type": String
            },
            "adressLine3": {
                "type": String
            },
            "city": {
                "type": String
            },
            "district": {
                "type": String
            },
            "state": {
                "type": String
            },
            "region": {
                "type": String
            },
            "mandal": {
                "type": String
            }
        }),
        "emailID": {
            "type": String
        }
    }),
    "credentials": new Schema({
        _id: false,
        "liscence": {
            "type": String
        }
    }),
    "entities": [ 
        new Schema ({
            _id: false,
            "entity_ID": {
                "type": Schema.Types.ObjectId
            }
        })
    ],
    "programs": [
        new Schema ({
            _id: false,
            "program_ID": {
                "type": Schema.Types.ObjectId
            }
        })
    ],
    "__v": {
        "type": Number
    }
}, { timestamps: true });

var organisationSchema = new Schema({
    "type": {
        "type": String
    },
    "identification": new Schema({
        _id: false,
        "name": {
            "type": String
        },
        "shortName": {
            "type": String
        }
    }),
    "contact": new Schema({
        _id: false,
        "telephone": new Schema({
            _id: false,
            "phoneType": {
                "type": String
            },
            "extension": {
                "type": String
            },
            "phoneNumber": {
                "type": Number
            }
        }),
        "address": new Schema({
            _id: false,
            "adressLine1": {
                "type": String
            },
            "adressLine2": {
                "type": String
            },
            "adressLine3": {
                "type": String
            },
            "city": {
                "type": String
            },
            "district": {
                "type": String
            },
            "state": {
                "type": String
            },
            "region": {
                "type": String
            },
            "mandal": {
                "type": String
            }
        }),
        "emailID": {
            "type": String
        }
    }),
    "credentials": new Schema({
        _id: false,
        "liscence": {
            "type": String
        }
    }),
    "entities": [ 
        new Schema ({
            "entity_ID": {
                "type": Schema.Types.ObjectId
            }
        })
    ],
    "programs": [
        new Schema ({
            _id: false,
            "program_ID": {
                "type": Schema.Types.ObjectId
            }
        })
    ],
    "__v": {
        "type": Number
    }
}, { timestamps: true });

var courseSchema = new Schema({
    "institution_ID": {
        "type": Schema.Types.ObjectId
    },
    "details": new Schema({
        _id: false,
        "title": {
            "type": String
        },
        "code": {
            "type": String
        },
        "credits": {
            "type": Number
        },
        "length": {
            "type": String
        },
        "requirement": {
            "type": String
        },
        "module": {
            "type": String
        },
        "moduleCode": {
            "type": String
        },
        "presntation": {
            "type": String
        },
        "presntationCode": {
            "type": String
        },
        "modulePresntationLength": {
            "type": String
        }
    }),
    "students": [
        new Schema({
            _id: false,
            "student_ID": {
                "type": Schema.Types.ObjectId
            },
            "student": new Schema({
                _id: false,
                "fullName": {
                    "type": String
                },
                "institute": {
                    "type": String
                }                
            }),
            "registrationDate": {
                "type": Date
            },
            "unregistrationDate": {
                "type": Date
            }
        })
    ],
    "instructors": [
        new Schema({
            _id: false,
            "instructor_ID": {
                "type": Schema.Types.ObjectId
            },
            "role": {
                "type": String
            }
        })
    ],
    "entities": [ 
        new Schema ({
            "entity_ID": {
                "type": Schema.Types.ObjectId
            }
        })
    ],
    "__v": {
        "type": Number
    },
}, { timestamps: true });

var assessmentSchema = new Schema({
    "course_ID": {
        "type": Schema.Types.ObjectId
    },
    "student_ID": {
        "type": Schema.Types.ObjectId
    },
    "details": new Schema({
        "A_name": {
            "type": String
        },
        "type": {
            "type": String
        },
        "goal": {
            "type": String
        },
        "date": new Schema({
            "start": {
                "type": Date
            },
            "end": {
                "type": Date
            },
            "submitted": {
                "type": Date
            }
        }),
        "module": {
            "type": String
        },
        "moduleCode": {
            "type": String
        },
        "presentation": {
            "type": String
        },
        "presentationCode": {
            "type": String
        },
        "isBanked": {
            "type": Boolean
        }
    }),
    "score": new Schema({
        "max": {
            "type": Number
        },
        "earned": {
            "type": Number
        }
    }),
    "entities": [ 
        new Schema ({
            "entity_ID": {
                "type": Schema.Types.ObjectId
            }
        })
    ],
    "__v": {
        "type": Number
    }
}, { timestamps: true });

var programSchema = new Schema({
    "details": new Schema({
        _id: false,
        "title": {
            "type": String
        },
        "code": {
            "type": String
        },
        "type": {
            "type": String
        },
        "location": {
            "type": String
        },
        "funding": new Schema({
            _id: false,
            "donor": {
                "type": String
            },
            "amount": {
                "type": String
            }
        })
    }),
    duration: {
        "startDate": {
            "type": Date
        },
        "endDate": {
            "type": Date
        },
        "year": {
            "type": String
        },
        "length": {
            "type": String
        }
    },
    "students": [
        new Schema({
            _id: false,
            "student_ID": {
                "type": Schema.Types.ObjectId
            },
            "registrationDate": {
                "type": Date
            },
            "unregistrationDate": {
                "type": Date
            }
        })
    ],
    "instructors": [
        new Schema({
            _id: false,
            "instructor_ID": {
                "type": Schema.Types.ObjectId
            },
            "role": {
                "type": String
            }
        })
    ],
    "entities": [ 
        new Schema({
            _id: false,
            "entity_ID": {
                "type": Schema.Types.ObjectId
            }
        })
    ],
    "__v": {
        "type": Number
    }
}, { timestamps: true });




module.exports = {
    Student: mongoose.model("student", studentSchema),
    Employee: mongoose.model("employee", employeeSchema),
    Institution: mongoose.model("institution", institutionSchema),
    Organisation: mongoose.model("organisation", organisationSchema),
    Course: mongoose.model("course", courseSchema),
    Assessment: mongoose.model("assessment", assessmentSchema),
    Program: mongoose.model("program", programSchema),
    studentSchema: studentSchema
};