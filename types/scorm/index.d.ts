export {};

/**
 * From the website (https://scorm.com/):
 * SCORM, which stands for Sharable Content Object Reference Model, is a set of technical standards
 * for eLearning software products. SCORM tells programmers how to write their code so that it can
 * “play well” with other eLearning software.
 *
 * It is the de facto industry standard for eLearning interoperability. Specifically, SCORM governs how
 * online learning content and Learning Management Systems (LMSs) communicate with each other. SCORM does
 * not speak to instructional design or any other pedagogical concern — it is purely a technical standard.
 *
 * Showpad customers upload SCORM apps to Courses, so we support the SCORM API to integrate these courses
 * with Showpad Coach. This is important to track the completion state of a SCORM course.
 *
 * There is no proper online documentation and no public package seems to properly type the API, so we
 * rolled our town type interface. Below interface defines window.corescorm, which every SCORM app uses.
 */

// From the official specification (https://scorm.com/scorm-explained/technical-scorm/run-time/run-time-reference/#section-2)

declare global {
  export type Scorm12CmiErrorCode =
    // No error
    // No error occurred, the previous API call was successful.
    | 0
    // General Exception
    // No specific error code exists to describe the error. Use LMSGetDiagnostic for more information.
    | 101
    // Invalid argument error
    // Indicates that an argument represents an invalid data model element or is otherwise incorrect.
    | 201
    // Element cannot have children
    // Indicates that LMSGetValue was called with a data model element name that ends in “_children”
    // for a data model element that does not support the “_children” suffix.
    | 202
    // Element not an array. Cannot have count.
    // Indicates that LMSGetValue was called with a data model element name that ends in “_count” for
    // a data model element that does not support the “_count” suffix.
    | 203
    // Not initialized
    // Indicates that an API call was made before the call to LMSInitialize.
    | 301
    // Not implemented error
    // The data model element indicated in a call to LMSGetValue or LMSSetValue is valid, but was not
    // implemented by this LMS. SCORM 1.2 defines a set of data model elements as being optional for an LMS to implement.
    | 401
    // Invalid set value, element is a keyword
    // Indicates that LMSSetValue was called on a data model element that represents a keyword
    // (elements that end in “_children” and “_count”).
    | 402
    // Element is read only.
    // LMSSetValue was called with a data model element that can only be read.
    | 403
    // Element is write only
    // LMSGetValue was called on a data model element that can only be written to.
    | 404
    // Incorrect Data Type
    // LMSSetValue was called with a value that is not consistent with the data format of the supplied
    // data model element.
    | 405;

  export type Scorm12CmiElement =
    | 'cmi.core._children'
    | 'cmi.core.student_id'
    | 'cmi.core.student_name'
    | 'cmi.core.lesson_location'
    | 'cmi.core.credit'
    | 'cmi.core.lesson_status'
    | 'cmi.core.entry'
    | 'cmi.core.score_children'
    | 'cmi.core.score.raw'
    | 'cmi.core.score.max'
    | 'cmi.core.score.min'
    | 'cmi.core.total_time'
    | 'cmi.core.lesson_mode'
    | 'cmi.core.exit'
    | 'cmi.core.session_time'
    | 'cmi.suspend_data'
    | 'cmi.launch_data'
    | 'cmi.comments'
    | 'cmi.comments_from_lms'
    | 'cmi.objectives._children'
    | 'cmi.objectives._count'
    | `cmi.objectives.${number}.id`
    | `cmi.objectives.${number}.score._children`
    | `cmi.objectives.${number}.score.raw`
    | `cmi.objectives.${number}.score.max`
    | `cmi.objectives.${number}.score.min`
    | `cmi.objectives.${number}.status`
    | 'cmi.student_data._children'
    | 'cmi.student_data.mastery_score'
    | 'cmi.student_data.max_time_allowed'
    | 'cmi.student_data.time_limit_action'
    | 'cmi.student_preference._children'
    | 'cmi.student_preference.audio'
    | 'cmi.student_preference.language'
    | 'cmi.student_preference.speed'
    | 'cmi.student_preference.text'
    | 'cmi.interactions._children'
    | 'cmi.interactions._count'
    | `cmi.interactions.${number}.id`
    | `cmi.interactions.${number}.objectives._count`
    | `cmi.interactions.${number}.objectives.${number}.id`
    | `cmi.interactions.${number}.time`
    | `cmi.interactions.${number}.type`
    | `cmi.interactions.${number}.correct_responses._count`
    | `cmi.interactions.${number}.correct_responses.${number}.pattern`
    | `cmi.interactions.${number}.weighting`
    | `cmi.interactions.${number}.student_response`
    | `cmi.interactions.${number}.result`
    | `cmi.interactions.${number}.latency'`;

  export type Scorm2004ErrorCode =
    // No Error
    // No error occurred, the previous API call was successful.
    | 0
    // General Exception
    // No specific error code exists to describe the error. Use GetDiagnostic for more information.
    | 101
    // General Initialization Failure
    // Call to Initialize failed for an unknown reason.
    | 102
    // Already Initialized
    // Call to Initialize failed because Initialize was already called.
    | 103
    // Content Instance Terminated
    // Call to Initialize failed because Terminate was already called.
    | 104
    // General Termination Failure
    // Call to Terminate failed for an unknown reason.
    | 111
    // Termination Before Initialization
    // Call to Terminate failed because it was made before the call to Initialize.
    | 112
    // Termination After Termination
    // Call to Terminate failed because Terminate was already called.
    | 113
    // Retrieve Data Before Initialization
    // Call to GetValue failed because it was made before the call to Initialize.
    | 122
    // Retrieve Data After Termination
    // Call to GetValue failed because it was made after the call to Terminate.
    | 123
    // Store Data Before Initialization
    // Call to SetValue failed because it was made before the call to Initialize.
    | 132
    // Store Data After Termination
    // Call to SetValue failed because it was made after the call to Terminate.
    | 133
    // Commit Before Initialization
    // Call to Commit failed because it was made before the call to Initialize.
    | 142
    // Commit After Termination
    // Call to Commit failed because it was made after the call to Terminate.
    | 143
    // General Argument Error
    // An invalid argument was passed to an API method
    // usually indicates that Initialize, Commit or Terminate did not receive the expected empty string argument.
    | 201
    // General Get Failure
    // Indicates a failed GetValue call where no other specific error code is applicable. Use GetDiagnostic for more information.
    | 301
    // General Set Failure
    // Indicates a failed SetValue call where no other specific error code is applicable. Use GetDiagnostic for more information.
    | 351
    // General Commit Failure
    //  Indicates a failed Commit call where no other specific error code is applicable. Use GetDiagnostic for more information.
    | 391
    // Undefined Data Model Element
    // The data model element name passed to GetValue or SetValue is not a valid SCORM data model element.
    | 401
    // Unimplemented Data Model Element
    //  The data model element indicated in a call to GetValue or SetValue is valid, but was not implemented by this LMS.
    // In SCORM 2004, this error would indicate an LMS that is not fully SCORM conformant.
    | 402
    // Data Model Element Value Not Initialized
    // Attempt to read a data model element that has not been initialized by the LMS or through a SetValue call.
    // This error condition is often reached during normal execution of a SCO.
    | 403
    // Data Model Element Is Read Only
    // SetValue was called with a data model element that can only be read.
    | 404
    // Data Model Element Is Write Only
    // GetValue was called on a data model element that can only be written to.
    | 405
    // Data Model Element Type Mismatch
    // SetValue was called with a value that is not consistent with the data format of the supplied data model element.
    | 406
    // Data Model Element Value Out Of Range
    // The numeric value supplied to a SetValue call is outside of the numeric range allowed for the supplied data model element.
    | 407
    // Data Model Dependency Not Established
    // Some data model elements cannot be set until another data model element was set. This error condition indicates
    // that the prerequisite element was not set before the dependent element.
    | 408;

  export type Scorm2004CmiElement =
    | 'cmi._version'
    | 'cmi.comments_from_learner._children'
    | 'cmi.comments_from_learner._count'
    | `cmi.comments_from_learner.${number}.comment`
    | `cmi.comments_from_learner.${number}.location`
    | `cmi.comments_from_learner.${number}.timestamp`
    | 'cmi.comments_from_lms._children'
    | 'cmi.comments_from_lms._count'
    | `cmi.comments_from_lms.${number}.comment`
    | `cmi.comments_from_lms.${number}.location`
    | `cmi.comments_from_lms.${number}.timestamp`
    | 'cmi.completion_status'
    | 'cmi.completion_threshold'
    | 'cmi.credit'
    | 'cmi.entry'
    | 'cmi.exit'
    | 'cmi.interactions._children'
    | 'cmi.interactions._count'
    | `cmi.interactions.${number}.id`
    | `cmi.interactions.${number}.type`
    | `cmi.interactions.${number}.objectives._count`
    | `cmi.interactions.${number}.objectives.${number}.id`
    | `cmi.interactions.${number}.timestamp`
    | `cmi.interactions.${number}.correct_responses._count`
    | `cmi.interactions.${number}.correct_responses.${number}.pattern`
    | `cmi.interactions.${number}.weighting`
    | `cmi.interactions.${number}.learner_response`
    | `cmi.interactions.${number}.result`
    | `cmi.interactions.${number}.latency`
    | `cmi.interactions.${number}.description`
    | 'cmi.launch_data'
    | 'cmi.learner_id'
    | 'cmi.learner_name'
    | 'cmi.learner_preference._children'
    | 'cmi.learner_preference.audio_level'
    | 'cmi.learner_preference.language'
    | 'cmi.learner_preference.delivery_speed'
    | 'cmi.learner_preference.audio_captioning'
    | 'cmi.location'
    | 'cmi.max_time_allowed'
    | 'cmi.mode'
    | 'cmi.objectives._children'
    | 'cmi.objectives._count'
    | `cmi.objectives.${number}.id`
    | `cmi.objectives.${number}.score._children`
    | `cmi.objectives.${number}.score.scaled`
    | `cmi.objectives.${number}.score.raw`
    | `cmi.objectives.${number}.score.min`
    | `cmi.objectives.${number}.score.max`
    | `cmi.objectives.${number}.success_status`
    | `cmi.objectives.${number}.completion_status`
    | `cmi.objectives.${number}.progress_measure`
    | `cmi.objectives.${number}.description`
    | 'cmi.progress_measure'
    | 'cmi.scaled_passing_score'
    | 'cmi.score._children'
    | 'cmi.score.scaled'
    | 'cmi.score.raw'
    | 'cmi.score.min'
    | 'cmi.score.max'
    | 'cmi.session_time'
    | 'cmi.success_status'
    | 'cmi.suspend_data'
    | 'cmi.time_limit_action'
    | 'cmi.total_time'
    | 'adl.nav.request'
    | 'adl.nav.request_valid.continue'
    | 'adl.nav.request_valid.previous'
    | `adl.nav.request_valid.choice.${string}`
    | `adl.nav.request_valid.jump.${string}`;

  interface Window {
    API:
      | {
          version: string;
          // Unofficial field we use to locally store CMI data
          cmi: Partial<Record<Scorm12CmiElement, unknown>>;
          /**
           * Begins a communication session with the LMS.
           * @return {boolean}
           */
          LMSInitialize: () => boolean;
          /**
           * Ends a communication session with the LMS.
           * @return {boolean}
           */
          LMSFinish: () => boolean;
          /**
           * Retrieves a value from the LMS.
           * @return {unknown}
           */
          LMSGetValue: (element: Scorm12CmiElement) => unknown;
          /**
           * Saves a value to the LMS.
           * @return {string}
           */
          LMSSetValue: (element: Scorm12CmiElement, value: string) => string;
          /**
           * Indicates to the LMS that all data should be persisted (not required).
           * @return {boolean}
           */
          LMSCommit: () => boolean;
          /**
           * Returns the error code that resulted from the last API call.
           * @return {Scorm12CmiErrorCode}
           */
          LMSGetLastError: () => Scorm12CmiErrorCode;
          /**
           * Returns a short string describing the specified error code.
           * @return {string}
           */
          LMSGetErrorString: (errorCode: Scorm12CmiErrorCode) => string;
          /**
           * Returns detailed information about the last error that occurred.
           * @return {string}
           */
          LMSGetDiagnostic: (errorCode: Scorm12CmiErrorCode) => string;
        }
      | undefined;
    API_1484_11:
      | {
          version: string;
          // Unofficial field we use to locally store CMI data
          cmi: Partial<Record<Scorm2004CmiElement, unknown>>;
          /**
           * Begins a communication session with the LMS.
           * @return {boolean}
           */
          Initialize: () => boolean;
          /**
           * Ends a communication session with the LMS.
           * @return {boolean}
           */
          Terminate: () => boolean;
          /**
           * Retrieves a value from the LMS.
           * @return {unknown}
           */
          GetValue: (element: Scorm2004CmiElement) => unknown;
          /**
           * Saves a value to the LMS.
           * @return {string}
           */
          SetValue: (element: Scorm2004CmiElement, value: string) => string;
          /**
           *: Indicates to the LMS that all data should be persisted (not required).
           * @return {boolean}
           */
          Commit: () => boolean;
          /**
           * Returns the error code that resulted from the last API call.
           * @return {Scorm2004ErrorCode}
           */
          GetLastError: () => Scorm2004ErrorCode;
          /**
           * Returns a short string describing the specified error code.
           * @return {string}
           */
          GetErrorString: (errorCode: Scorm2004ErrorCode) => string;
          /**
           * Returns detailed information about the last error that occurred.
           * @return {string}
           */
          GetDiagnostic: (errorCode: Scorm2004ErrorCode) => string;
        }
      | undefined;
  }
}
