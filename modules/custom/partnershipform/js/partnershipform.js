/**
 * @file
 * Defines Javascript behaviors for the module.
 */

(function ($) {
  $(document).ready(function () {

    // Disable back button on thanks page
    if ($('body  #webform-submission-partnership-node-47-form .form-confirm-wrapper').length >= 1) {

    } else {  // on form page

      eventCategory = 'Partnership Form Visit';
      eventAction = 'NUll';
      eventLabel = 'NULL';
      eventValue = 1;
      gtag('event', 'FormSubmit', {
        'event_category': eventCategory,
        'event_action': eventAction,
        'event_label': eventLabel,
        'value': 1,
      });

      window.setInterval(recaptchaCheck, 500);
      $('#edit-state').select2({
        minimumResultsForSearch: Infinity,
        // placeholder: 'Select an option',
        dropdownParent: $('.form-item-state'),
      });
    }
  });

  // calls all requried validaion
  requiredValidation();
  // Validation for country drop down
  stateValidation();

  //Validation function when we submit the form 
  SubmitValidation();

  /*
   * 
   * Captures the keyup and select event on a form if it has a error.
   */
  function requiredValidation() {
    if ($('form#webform-submission-partnership-node-47-form').hasClass('error'))
    {
      $('#edit-area-of-partnering-interest').on('keyup', function (e) {
        // aoiRequiredValidation();
        fieldRequiredValidation('#edit-area-of-partnering-interest', '.form-item-area-of-partnering-interest', 'Please enter your area of interest');
      });

      $('#edit-comments').on('keyup', function (e) {
        textAreaRequiredValidation('#edit-comments', '.form-item-comments', 'Please enter your Comments');
      });
      $('#edit-first-name').on('keyup', function (e) {
        fieldRequiredValidation('#edit-first-name', '.form-item-first-name', 'Please enter your First Name');
      });
      $('#edit-last-name').on('keyup', function (e) {
        fieldRequiredValidation('#edit-last-name', '.form-item-last-name', 'Please enter your Last Name');
      });
      $('#edit-address-1').on('keyup', function (e) {
        fieldRequiredValidation('#edit-address-1', '.form-item-address-1', 'Please enter your Address');
      });
      $('#edit-city').on('keyup', function (e) {
        fieldRequiredValidation('#edit-city', '.form-item-city', 'Please enter your City');
      });
      $('#edit-zip-code').on('keyup', function (e) {
        // fieldRequiredValidation('#edit-city','.form-item-city','Please enter your City' );
        zipcodeValidation('#edit-zip-code', '.form-item-zip-code');
      });

      $('#edit-phone').on('keyup', function (e) {
        // fieldRequiredValidation('#edit-city','.form-item-city','Please enter your City' );
        phoneValidation('#edit-phone', '.form-item-phone', 'Phone Number');
      });
      $('#edit-fax').on('keyup', function (e) {
        // fieldRequiredValidation('#edit-city','.form-item-city','Please enter your City' );
        faxValidation('#edit-fax', '.form-item-fax', 'Fax Number');
      });
      $('#edit-email-address').on('keyup', function (e) {
        // fieldRequiredValidation('#edit-city','.form-item-city','Please enter your City' );
        emailValidation('#edit-email-address', '.form-item-email-address');
      });
      $('#edit-state').on('select2:select', function (e) {
        stateValidation();
      });

    }
  }

  /*
   * Required validation for individual fields.
   */
  function fieldRequiredValidation(inputIdSelector, formItemClass, errorMessage) {

    if ($(inputIdSelector).val() == '')
    {
      if ($(formItemClass + ' label.error').length < 1)
      {
        $(inputIdSelector).before('<label class="error">' + errorMessage + '</label>');
      } else {
        //console.log($(formItemClass+' label.error'));
        $(formItemClass + ' label.error').text(errorMessage);
      }
      $(formItemClass + ' label.error').css('display', 'inline-block');
      $(formItemClass).addClass('error has-error');
    } else
    {
      $(formItemClass + ' label.error').css('display', 'none');
      $(formItemClass).removeClass('error has-error');
    }
  }

  function textAreaRequiredValidation(inputIdSelector, formItemClass, errorMessage) {
    if ($(inputIdSelector).val() == '')
    {
      if ($(formItemClass + ' label.error').length < 1)
      {
        $(inputIdSelector).parent('.form-textarea-wrapper').before('<label class="error">' + errorMessage + '</label>');
      } else {
        //console.log($(formItemClass+' label.error'));
        $(formItemClass + ' label.error').text(errorMessage);
      }
      $(formItemClass + ' label.error').css('display', 'inline-block');
      $(formItemClass).addClass('error has-error');
    } else
    {
      $(formItemClass + ' label.error').css('display', 'none');
      $(formItemClass).removeClass('error has-error');
    }

  }


  function stateValidation() {
    if ($('#select2-edit-state-container').text() == 'Select State') {

      if ($('.form-item-state label.error').length < 1)
      {
        $('#edit-state').parent('.select-wrapper').before('<label class="error">Please select your State</label>')
      } else {
        $('.form-item-state label.error').text('Please select your State');
      }
      $('.form-item-state label.error').css('display', 'inline-block');
      $('.form-item-state ').addClass('error has-error');
    } else {
      $('.form-item-state label.error').css('display', 'none');
      $('.form-item-state ').removeClass('error has-error');
    }
  }

  /*
   * Validation function for zipcode.
   */
  function zipcodeValidation(inputIdSelector, formItemClass) {
    var isnum = /^\d+$/.test($(inputIdSelector).val());
    if ($(inputIdSelector).val().length > 0) {
      if (($(inputIdSelector).val().length != 5 || (!isnum))) {
        if ($(formItemClass + ' label.error').length < 1)
        {
          $(inputIdSelector).before('<label class="error">Please enter valid Zipcode</label>');
        } else {
          $(formItemClass + ' label.error').text('Please enter valid Zipcode');
        }
        $(formItemClass + ' label.error').css('display', 'inline-block');
        $(formItemClass).addClass('error has-error');
      } else
      {
        $(formItemClass + ' label.error').css('display', 'none');
        $(formItemClass).removeClass('error has-error');
      }
    } else {
      if ($(formItemClass + ' label.error').length < 1)
      {
        $(inputIdSelector).before('<label class="error">Please enter your Zipcode</label>');
      } else {
        //console.log($(formItemClass+' label.error'));
        $(formItemClass + ' label.error').text('Please enter your Zipcode');
      }
      $(formItemClass + ' label.error').css('display', 'inline-block');
      $(formItemClass).addClass('error has-error');
    }
  }
  /*
   * 
   * inputIdSelector -> the id selctor of the form with #Prepended
   * formItemClass -> the form item class
   * fieldLabel -> the name of the field
   * 
   * Validation function for Phone number
   */
  function phoneValidation(inputIdSelector, formItemClass, fieldLabel) {
    var isnum = /^\d+$/.test($(inputIdSelector).val());
    if ($(inputIdSelector).val().length > 0) {
      if (($(inputIdSelector).val().length < 10 || $(inputIdSelector).val().length > 15 || (!isnum))) {
        if ($(formItemClass + ' label.error').length < 1)
        {
          $(inputIdSelector).before('<label class="error">Please enter valid ' + fieldLabel + '</label>');
        } else {
          $(formItemClass + ' label.error').text('Please enter valid ' + fieldLabel);
        }
        $(formItemClass + ' label.error').css('display', 'inline-block');
        $(formItemClass).addClass('error has-error');
      } else
      {
        $(formItemClass + ' label.error').css('display', 'none');
        $(formItemClass).removeClass('error has-error');
      }
    } else if ($(inputIdSelector).val().length == 0) {
      if ($(formItemClass + ' label.error').length < 1)
      {
        $(inputIdSelector).before('<label class="error">Please enter your ' + fieldLabel + '</label>');
      } else {
        //console.log($(formItemClass+' label.error'));
        $(formItemClass + ' label.error').text('Please enter your ' + fieldLabel);
      }
      $(formItemClass + ' label.error').css('display', 'inline-block');
      $(formItemClass).addClass('error has-error');
    }

  }

  /*
   * 
   * inputIdSelector -> the id selctor of the form with #Prepended
   * formItemClass -> the form item class
   * fieldLabel -> the name of the field
   * 
   * Validation function for Phone number
   */
  function faxValidation(inputIdSelector, formItemClass, fieldLabel) {
    var isnum = /^\d+$/.test($(inputIdSelector).val());
    if ($(inputIdSelector).val().length > 0) {
      if (($(inputIdSelector).val().length < 10 || $(inputIdSelector).val().length > 15 || (!isnum))) {
        if ($(formItemClass + ' label.error').length < 1)
        {
          $(inputIdSelector).before('<label class="error">Please enter valid ' + fieldLabel + '</label>');
        } else {
          $(formItemClass + ' label.error').text('Please enter valid ' + fieldLabel);
        }
        $(formItemClass + ' label.error').css('display', 'inline-block');
        $(formItemClass).addClass('error has-error');
      } else
      {
        $(formItemClass + ' label.error').css('display', 'none');
        $(formItemClass).removeClass('error has-error');
      }
    } else {
      $(formItemClass + ' label.error').css('display', 'none');
      $(formItemClass).removeClass('error has-error');
    }
  }



  /*
   * Validation function to verify the email format.
   */
  function emailValidation(inputIdSelector, formItemClass)
  {
    var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{1,10}$/;
    var emailCheck = filter.test($(inputIdSelector).val());

    if ($(inputIdSelector).val().length > 0)
    {
      if (!emailCheck)
      {
        if ($(formItemClass + ' label.error').length < 1)
        {
          $(inputIdSelector).before('<label class="error">Please enter valid Email Address</label>');
        } else {
          $(formItemClass + ' label.error').text('Please enter valid Email Address');
        }
        $(formItemClass + ' label.error').css('display', 'inline-block');
        $(formItemClass).addClass('error has-error');
      } else {
        $(formItemClass + ' label.error').css('display', 'none');
        $(formItemClass).removeClass('error has-error');
      }

    } else
    {
      if ($(formItemClass + ' label.error').length < 1)
      {
        $(inputIdSelector).before('<label class="error">Please enter your Email Address</label>');
      } else {
        //console.log($(formItemClass+' label.error'));
        $(formItemClass + ' label.error').text('Please enter your Email Address');
      }
      $(formItemClass + ' label.error').css('display', 'inline-block');
      $(formItemClass).addClass('error has-error');
    }

  }

  /*
   * functions to be called when you click on submit form
   */
  function SubmitValidation() {
    $('button.webform-button--submit').on('click', function (e) {
      fieldRequiredValidation('#edit-area-of-partnering-interest', '.form-item-area-of-partnering-interest', 'Please enter your area of interest');
      textAreaRequiredValidation('#edit-comments', '.form-item-comments', 'Please enter your Comments');
      fieldRequiredValidation('#edit-first-name', '.form-item-first-name', 'Please enter your First Name');
      fieldRequiredValidation('#edit-last-name', '.form-item-last-name', 'Please enter your Last Name');
      fieldRequiredValidation('#edit-address-1', '.form-item-address-1', 'Please enter your Address');
      fieldRequiredValidation('#edit-city', '.form-item-city', 'Please enter your City');
      zipcodeValidation('#edit-zip-code', '.form-item-zip-code');
      phoneValidation('#edit-phone', '.form-item-phone', 'Phone Number');
      faxValidation('#edit-fax', '.form-item-fax', 'Fax Number');
      emailValidation('#edit-email-address', '.form-item-email-address');
      stateValidation();
// recpatch code 
      var response = grecaptcha.getResponse();
      if (response) {
        //captcha validated and got response code
        $('.captcha label.error').css('display', 'none');
        $('.g-recaptcha').removeClass('error has-error');
      } else {
        //not validated or not clicked
        if ($('.captcha label.error').length < 1)
        {
          $('.g-recaptcha').after('<label class="error">Please Fill Captcha</label>');
        } else
        {
          $('.captcha label.error').text('Please Fill Captcha');
        }
        $('.captcha label.error').css('display', 'inline-block');
        $('.g-recaptcha').addClass('error has-error');
        e.preventDefault();
      }
      $('form#webform-submission-partnership-node-47-form').each(function () {
        if ($('.form-item.error').length >= 1) {
          $('form#webform-submission-partnership-node-47-form').addClass('error');
          $('html, body').animate({
            scrollTop: $(".form-item +.error").offset().top - 250
          }, 1000);
          e.preventDefault();
          requiredValidation();
        } else {
          $('form#webform-submission-partnership-node-47-form').removeClass('error');
          eventCategory = 'Partnership Form Submission';
          eventAction = $('#select2-edit-state-container').text();
          eventLabel = $('#edit-email-address').val();
          eventValue = 1;
          gtag('event', 'FormSubmit', {
            'event_category': eventCategory,
            'event_action': eventAction,
            'event_label': eventLabel,
            'value': 1,
          });
          localStorage.setItem('partnerRedirect', 'partner-form');
        }
      });
    });
  }


  /*
   * Check captcha after 500 milli seconds
   */
  function recaptchaCheck() {
    if ($('form#webform-submission-partnership-node-47-form').hasClass('error'))
    {
      var response = grecaptcha.getResponse();
      if (response) {
        //captcha validated and got response code
        $('.captcha label.error').css('display', 'none');
        $('.g-recaptcha').removeClass('error has-error');
      } else {
        //not validated or not clicked
        if ($('.captcha label.error').length < 1)
        {
          $('.g-recaptcha').after('<label class="error">Please Fill Captcha</label>');
        } else
        {
          $('.captcha label.error').text('Please Fill Captcha');
        }
        $('.captcha label.error').css('display', 'inline-block');
        $('.g-recaptcha').addClass('error has-error');
      }
    }
  }



})(jQuery);