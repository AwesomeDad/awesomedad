jQuery(document).ready(function($) {
  // Perform AJAX login on form submit
  $("form#signin, form#register").on("submit", function(e) {
    e.preventDefault();
    NProgress.start();
    //if (!$(this).valid()) return false;
    $("p.status", this)
      .show()
      .text(ajax_auth_object.loadingmessage);
    action = "ajaxlogin";
    username = $("form#signin #username").val();
    password = $("form#signin #password").val();
    email = "";
    security = $("form#signin #security").val();
    if ($(this).attr("id") == "register") {
      action = "ajaxregister";
      username = $("#signonname").val();
      // password = $("#signonpassword").val();
      email = $("#email").val();
      security = $("#signonsecurity").val();
    }
    ctrl = $(this);
    $.ajax({
      type: "POST",
      dataType: "json",
      url: ajax_auth_object.ajaxurl,
      data: {
        action: action,
        username: username,
        password: password,
        email: email,
        security: security
      },
      success: function(data) {
        NProgress.done();
        $("p.status", ctrl).html(
          '<div class="card p-3 mb-5"><div class="d-flex align-items-center"><i class="icon-info text-primary mr-3"></i><small>' +
            data.message +
            "</small></div></div>"
        );
        if (data.loggedin == true) {
          document.location.href = ajax_auth_object.redirecturl;
        }
      }
    });
    e.preventDefault();
  });
});
