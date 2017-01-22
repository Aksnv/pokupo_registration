
var subdomainPattern = new RegExp("^[0-9a-z]([0-9a-z\-_])*[0-9a-z]$");
        var emailPattern = new RegExp("^[a-zA-Z0-9А-Яа-я\-_\.]{2,}[@]{1}([a-zA-Z0-9А-Яа-я\-_]{2,}[\.]{1}){1,}[a-zA-Z0-9А-Яа-я]{2,}$");

var urlPattern = new RegExp("^(https?:\/\/)?(www.)?([a-zA-Z0-9А-Яа-я_]{2,}[\.]{1}){1,}[a-zA-Z0-9А-Яа-я]{2,}$");
var phonePattern = new RegExp("^7|8[0-9]{10}$");
//var sellernamePattern = new RegExp("/^[_\s\.\-]+|[^a-zA-Zа-яёА-ЯЁ0-9_\s\.\-]+|[_\s\.\-]{2,}|[_\s\.\-]+$/i");
var sellernamePattern = new RegExp("^[a-zA-Zа-яёА-Я]{1}[a-zA-Zа-яёА-ЯЁ0-9 _\.\-]{3,}$");

//проверка имени продавца
function isSellernameCorrect(){
    onBlurField('sellername');
    var sellername = $("input[name=sellername]").val();
    if (sellername && sellername.length > 0) {
        if (sellername.length > 40) {
            $('.sellernameError').html('Hазвание магазина не может быть более 40 символов');
            return false;
        }
        else if (sellername.length < 4) {
            $('.sellernameError').html('Hазвание магазина не может быть менее 4 символов');
            return false;
        }
        else if (!sellernamePattern.test(sellername)) {
            $('.sellernameError').html('Логин/название магазина содержит недопустимые символы. Название магазина может содержать русские и латинские символы, цифры, подчеркивания, дефисы, точки и пробелы. Первым символом должна быть буква');
            return false;
        } else {
            $('.sellernameError').html('');
            return true;
        }
    } else {
        $('.sellernameError').html('');
        return true;
    }
}

//проверка email
function isEmailCorrect(){
    onBlurField('email');
    var email = $("input[name=email]").val();
    if (!email) {
        $("input[name=email]").css({'border' : '2px solid red'});
        $('.emailError').html('Это поле обязательно для заполнения');
        return false;
    }
    var emailCorrect = true;
    if (!emailPattern.test(email)) {
        $("input[name=email]").css({'border' : '2px solid red'});
        $('.emailError').html('Введите корректный email');
        emailCorrect = false;
        return false;
    }
    if (email && emailCorrect)  {
        $("input[name=email]").css({'border' : '2px solid #FFA800'});
        $('.emailError').html('');
        return true;
    }
}

//проверка телефона
function isPhoneCorrect(){
    onBlurField('phone');
    var phone = $("input[name=phone]").val();
    if (phone) {
        var phoneFixed = phone.replace(/\D+/g, '');
        if (!phonePattern.test(phoneFixed)) {
            $('.phoneError').html('Введите корректный телефон (11 цифр начиная с 7)');
            return false;;
        } else {
            $('.phoneError').html('');
            return true;
        }
    } else {
        $('.phoneError').html('');
        return true;
    }

}

function isUrlCorrect(){
    onBlurField('site');
    $('#placeholder-url').html('');
    var site = $("input[name=site]").val();
    if (site) {
        if (!urlPattern.test(site)) {
            $('.siteError').html('Введите корректный URL');
            return false;
        } else {
            $('.siteError').html('');
            return true;
        }
    } else {
        $('.siteError').html('');
        return true;
    }
}

function onFocusField(field){
    var label = $("input[name="+field+"]").attr('placeholder');
    $('#placeholder-'+ field).html(label);
}

function onBlurField(field){
    $('#placeholder-' + field).html('');
}


$(document).ready(function() {
    var email = '';
    var phone = '';
    var seller_type = 'person'
    var invite = '';
    var site = '';
    var subdomain = '';
    var mail_token
    var sms_token = '';
    var query = getUrlVars();
    var nameSeller = '';
    var idPartner = '';

    /******************************Функции********************************/
    //Получить get данные
    function getUrlVars()
    {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    function clearErrors(){
        $('.errorFieldCode').html('');
        $('.errorField').html('');
    }

    //установить значения переменных
    function setData(){
        if (query['name_seller'])  nameSeller = query['name_seller'];
        if (query['email_seller'])  email = query['email_seller'];
        if (query['phone_seller'])  phone = query['phone_seller'];
        if (query['type_seller'])  seller_type = query['type_seller'];
        if (query['invite'])  invite = query['invite'];
        if (query['site'])  site = query['site'];
        if (query['mail_token'])  mail_token = query['mail_token'];
        if (query['sms_token'])  sms_token = query['sms_token'];
        if (query['subdomain'])  subdomain = query['subdomain'];

        $("input[name=sellername]").val(nameSeller);
        $("input[name=email]").val(email);
        $("input[name=phone]").val(phone);
        $("input[name=invite]").val(invite);
        $("input[name=site]").val(site);
        $("input[name=mail_token]").val(mail_token);
        $("input[name=sms_token]").val(sms_token);
        $("input[name=subdomain]").val(subdomain);

        $("input[name=type_seller][value=" + seller_type + "]").attr('checked', 'checked');
        checkTypeSeller(seller_type);
    }
    function checkTypeSeller(type) {
        /*$("." + type).css({'border' : '3px solid #099033'});*/
        if (type == 'company') {
            /*$(".person").css({'border' : '2px solid #CCCCCC'});*/
        } else {
            /*$(".company").css({'border' : '2px solid #CCCCCC'});*/
        }
    }
    setData();

    var subdomainErrorMessage =  'Субдомен может содержать только латинские символы, цифры, дефис и подчеркивание. Первым  и последним символами должны быть латинские символы.';

    /********************************************************************/

    //показать / скрыть доп поля
    $(".showLink").toggle(function(){
        $('#nonrequired-fields').show();
        $('.iconOpenClose').removeClass('iconClose');
        $('.iconOpenClose').addClass('iconOpen');
    }, function(){
        $('#nonrequired-fields').hide();
        $('.iconOpenClose').removeClass('iconOpen');
        $('.iconOpenClose').addClass('iconClose');
    });

    //Изменить цвет при выделении плашки типа продавца
    $('input[name|="type_seller"]').change(function() {
        var type = $(this).val();
        checkTypeSeller(type);
    });

    //при переходе по ссылке активации
    var query = getUrlVars();
    if (query['mail_token']) {
        $('#regForm').hide();
        $('#codeForm').show();
        if (!phone) {
            $('.message-send-email').hide();
            $('.message-send-email-phone').show();
            $('.sms-code-block').hide();
        }
    }

    //Изменить надпись кнопки при введении телефона
    $("input[name=phone]").each(function() {
        var elem = $(this);
        elem.data('oldVal', elem.val());
        elem.bind("propertychange change click keyup input paste", function(event){
            if (elem.data('oldVal') != elem.val()) {
                elem.data('oldVal', elem.val());
                if (elem.val() !='') {
                    $(".buttonGetCode").html("Получить код на email и телефон");
                } else {
                    $(".buttonGetCode").html("Получить код на email");
                }
            }
        });
    });


    //ПОказать адрес с субдоменом
    $("input[name=subdomain]").each(function() {
        var elem = $(this);
        elem.data('oldVal', elem.val());
        elem.bind("propertychange change click keyup input paste", function(event){
            if (elem.data('oldVal') != elem.val()) {
                elem.data('oldVal', elem.val());
                if (elem.val().length > 1) {
                    if (subdomainPattern.test(elem.val())) {
                        $('.subdomainError').html('');
                        $('.subdomainInfo').html('Адрес вашего магазина: ' + elem.val() + '.pokupo.ru');
                    } else {
                        $('.subdomainError').html(subdomainErrorMessage);
                        $('.subdomainInfo').html('');
                    }
                } else {
                    $('.subdomainError').html('');
                    $('.subdomainInfo').html('');
                }

            }
        });
    });

    //получить код
    $(".buttonGetCode").click(function(event){
        event.preventDefault();
        email = $("input[name=email]").val();
        phone = $("input[name=phone]").val();
        nameSeller = $("input[name=sellername]").val();
        seller_type = $('input[name=type_seller]:checked', '#regForm').val();
        invite = $("input[name=invite]").val();
        site = $("input[name=site]").val();
        subdomain = $("input[name=subdomain]").val();

        var validError = false;

        if (!isUrlCorrect()) validError = true;
        if (!isPhoneCorrect()) validError = true;
        if (!isEmailCorrect()) validError = true;
        if (!isSellernameCorrect()) validError = true;
        if (subdomain) {
            if (!subdomainPattern.test(subdomain)) validError = true;
        }

        if (validError) {
            $('#nonrequired-fields').show();
        }


        var agree = $('input[name=iagree]').is(":checked")

        if (!agree) {
            $(".iagree-req-message").css({'display' : 'block'});
        }
        if (email && agree && !validError) {
            $(".iagree-req-message").css({'display' : 'none'});
            $("input[name=email]").css({'border' : '2px solid #FFA800'});

            var url = "https://seller.pokupo.ru/api/user/reg_seller/?email_seller=" + encodeURIComponent(email) + "&name_seller=" + nameSeller + "&phone_seller=" + phone +
                    "&invite=" + invite + "&site=" + site + "&type_seller=" + seller_type+ "&subdomain=" + subdomain + "&id_partner=" + idPartner;
            $('#regForm').hide();
            $('.loading').show();
            $.ajax({
                url: url,
                success: function(data){
                    if (data.err!==undefined) {
                        $('#regForm').show();
                        var errMessage = '';
                        if (data.err=='Почтовый ящик уже зарегистрирован') {
                            errMessage = "Почтовый ящик уже зарегистрирован. Вы можете <a href='https://seller.pokupo.ru/login'>войти</a> в кабинет или <a href='https://seller.pokupo.ru/resetting/request'>восстановить пароль</a>.";
                        } else {
                            errMessage = data.err;
                        }
                        $('.errorField').html(errMessage);

                    } else {
                        nameSeller = data.name_seller;
                        $('#codeForm').show();
                        if (!phone) {
                            $('.sms-code-block').hide();
                        }
                    }
                },
                fail: function(data){
                    $('#regForm').show();
                    $('.errorField').html(data.err);

                },
                complete: function(){
                    $('.loading').hide();
                }
            });
        }
    });

    //кнопка назад
    $(".backButton").click(function(event){
        event.preventDefault();
        clearErrors();
        $('#regForm').show();
        $('#codeForm').hide();
    });

    //активировать
    $(".activateButton").click(function(event){
        event.preventDefault();

        seller_type = $('input[name=type_seller]:checked', '#regForm').val();
        mail_token = $("input[name=mail_token]").val();
        sms_token = $("input[name=sms_token]").val();
        invite = $("input[name=invite]").val();
        site = $("input[name=site]").val();
        phone = $("input[name=phone]").val();

        if (mail_token && (sms_token || !phone)) {
            var url2 = "https://seller.pokupo.ru/api/user/rega/seller/?type_seller=" + seller_type +
                    "&mail_token=" + mail_token + "&sms_token=" + sms_token + "&invite=" + invite + "&site=" + site +
                    "&name_seller=" + encodeURIComponent(nameSeller) + "&subdomain=" + subdomain  + "&id_partner=" + idPartner ;
            //console.log(url2);
            $('#regForm').hide();
            $('#codeForm').hide();
            $('.loading').show();
            $.ajax({
                url: url2,
                success: function(data){
                    if (data.err!==undefined) {
                        $('#codeForm').show();
                        $('.errorFieldCode').html(data.err);
                    } else {
                        window.location = "https://seller.pokupo.ru/user/dashboard/";
                        //window.location = "https://dashboard.pokupo.ru";
                    }
                },
                fail: function(data){
                    $('#codeForm').show();
                    $('.errorFieldCode').html(data.err);

                },
                complete: function(){
                    $('.loading').hide();
                }
            });
        } else {
            $('.errorFieldCode').html("Введите код подтверждения");
        }
    });
});
