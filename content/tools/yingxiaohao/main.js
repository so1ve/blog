var msg, _index = 0;
var config = [
    {
        name: "基础文案",
        html: `<label for="subject">主体</label><input type="text" id="subject" class="form-control" placeholder="楼主" required><label for="event">事件</label><input type="text" id="event" class="form-control" placeholder="氵帖" required><label for="subject-event">另一种说法</label><input type="text" id="subject-event" class="form-control" placeholder="获取经验" required>`,
        generate: function () {
            subject = $("#subject").val();
            _event = $("#event").val();
            subjectEvent = $("#subject-event").val();
            if (!subject.length || !_event.length || !subjectEvent.length) return;
            resultTitle = `${subject}${_event}是怎么回事呢？`
            result = `　　${subject}${_event}是怎么回事呢？${subject}相信大家都很熟悉，但是${subject}${_event}是怎么回事呢，下面就让小编带大家一起了解吧。\r\n　　${subject}${_event}，其实就是${subjectEvent}，大家可能会很惊讶${subject}怎么会${_event}呢？但事实就是这样，小编也感到非常惊讶。\r\n　　这就是关于${subject}${_event}的事情了，大家有什么想法呢，欢迎在评论区告诉小编一起讨论哦！`;
            $("#result-title").val(resultTitle);
            $("#result").val(result);
        }
    },
    {
        name: "升级文案",
        html: `<label for="modal">语气词</label><input type="text" id="modal" class="form-control" placeholder="震惊" required><label for="subject">主体物</label><input type="text" id="subject" class="form-control" placeholder="香蕉" required><label for="attribute">定语</label><input type="text" id="attribute" class="form-control" placeholder="尽量避免" required><label for="secSubject">与什么...（第二主体）</label><input type="text" id="secSubject" class="form-control" placeholder="木瓜" required><label for="event">事件</label><input type="text" id="event" class="form-control" placeholder="频繁混合使用" required>`,
        generate: function () {
            modal = $("#modal").val();
            subject = $("#subject").val();
            attribute = $("#attribute").val();
            secSubject = $("#secSubject").val();
            _event = $("#event").val();
            if (!modal.length || !subject.length || !attribute.length || !secSubject.length || !_event.length) return;
            resultTitle = `${modal}！${subject}${attribute}和${secSubject}${_event}！原因竟然是...`
            result = `    ${subject}为什么不能与${secSubject}${_event}，这究竟是怎么回事呢？${subject}相信大家很熟悉吧，但是不能与${secSubject}${_event}是怎么回事呢？下面就让小编带着大家一起去了解吧。\n    ${subject}不能与${secSubject}${_event}，其实就是${subject}不能与${secSubject}${_event}。大家可能会感到很惊讶，${subject}为什么${attribute}与${secSubject}${_event}。\n    这些就是${subject}为什么${attribute}与${secSubject}${_event}的全部内容了。大家有什么想法呢，欢迎在评论区里与小编留言互动哦~我们下期再见！`;
            $("#result-title").val(resultTitle);
            $("#result").val(result);
        }
    },
    {
        name: "刘狺达文案",
        html: `<label for="subject">主体</label><input type="text" id="subject" class="form-control" placeholder="刘信达" required><label for="event">必须限期做什么</label><input type="text" id="event" class="form-control" placeholder="离开人世" required><label for="subjectType">主体类型</label><input type="text" id="subjectType" class="form-control" placeholder="Dog" required><label for="whatDoesHeDo">做了什么事</label><input type="text" id="whatDoesHeDo" class="form-control" placeholder="带坏青少年" required><label for="cons1">后果1</label><input type="text" id="cons1" class="form-control" placeholder="污染大气层" required><label for="cons2">后果2</label><input type="text" id="cons2" class="form-control" placeholder="浪费水资源" required><label for="do">做什么改正（不可能的）</label><input type="text" id="do" class="form-control" placeholder="离开地球" required>`,
        generate: function () {
            subject = $("#subject").val();
            _event = $("#event").val();
            subjectType = $("#subjectType").val();
            whatDoesHeDo = $("#whatDoesHeDo").val();
            cons1 = $("#cons1").val();
            cons2 = $("#cons2").val();
            _do = $("#do").val();
            if (!subject.length || !_event.length || !whatDoesHeDo.length || !subjectType.length || !cons1.length || !cons2.length || !_do.length) return;
            resultTitle = `【${subject}必须限期${_event}! 】`
            result = `${subject}，${subjectType}${whatDoesHeDo}成何体统，你不怕${cons1}吗，你不怕${cons2}吗，你不怕带坏青少年吗，刘信达限你三个月，必须${_do}，否则逐出${subjectType}圈!`;
            $("#result-title").val(resultTitle);
            $("#result").val(result);
        }
    }
];

msg = ""
for (let i = 0; i < config.length; i++) {
    msg += `<div class="custom-control custom-radio custom-control-inline">
    <input type="radio" id="type-` + i + `" name="choose" class="custom-control-input" value="` + i + `">
    <label class="custom-control-label" for="type-` + i + `">` + config[i].name + `</label>
</div>`; 
}

$("#radio").html(msg);

function reset () {
    $("#result").val("");
    $("#result-title").val("");
}

$("input[name='choose']").change(function () {
    reset();
    $('button').removeAttr("disabled");
    _index = Number($(this).val());
    msg = "";
    msg += config[_index].html;
    $("#show").html(msg);
});

$('#generate').on('click', function () {
    config[_index].generate();
});

$('#audio').on('click', function () {
    $('#audio').attr('disabled', '');
    var url = "//tts.baidu.com/text2audio?cuid=baiduid&lan=zh&ctp=1&pdt=311&tex=" + $("#result").val();
    var player = new Audio(url);
    player.play();
    $(player).on('ended', function () {
        $('#audio').removeAttr('disabled');
    });
});

var _hmt = _hmt || [];
(function() {
	var hm = document.createElement("script");
	hm.src = "https://hm.baidu.com/hm.js?458eb53f35b66573079d5bbac284a244";
	var s = document.getElementsByTagName("script")[0]; 
	s.parentNode.insertBefore(hm, s);
})();
(function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    }
    else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();