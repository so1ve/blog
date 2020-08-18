---
title: "体系"
date: 2020-03-25T09:24:54+08:00
description: "体系"
draft: false
comments: true
related: false
displayCopyright: false
badge: false
gitinfo: false
---

<h4>Python</h4>

<div id="python" class="echarts"></div>

<h4>前端</h4>

<div id="frontend" class="echarts"></div>
<script src="//cdn.jsdelivr.net/gh/FFRaycoder/cdn@latest/static/js/jquery-3.5.0.min.js"></script>
<script src="//cdn.jsdelivr.net/gh/FFRaycoder/cdn@latest/static/js/echarts-en.min.js"></script>
<script type="text/javascript">
function transData(a, idStr, pidStr, childrenStr) {
    var r = [],
        hash = {},
        id = idStr,
        pid = pidStr,
        children = childrenStr,
        i = 0,
        j = 0,
        len = a.length;
    for (; i < len; i++) {
        hash[a[i][id]] = a[i];
    }
    for (; j < len; j++) {
        var aVal = a[j],
            hashVP = hash[aVal[pid]];
        if (hashVP) {
            !hashVP[children] && (hashVP[children] = []);
            hashVP[children].push(aVal);
        } else {
            r.push(aVal);
        }
    }
    return r;
}
function clickNode(name, value, url) {
    if (url == undefined) return;
    if (url === "") return;
    window.open(url);
}
var pythonChart = echarts.init(document.getElementById('python'));
pythonChart.showLoading();
$.get('/json-data/python.json', function(data) {
    pythonChart.hideLoading();
    echarts.util.each(data.children, function(datum, index) {
        index % 2 === 0 && (datum.collapsed = true);
    });
    pythonChart.setOption(option = {
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series: [{
            type: 'tree',
            data: transData(data, 'value', 'sj', 'children'),
            top: '1%',
            left: '100px',
            bottom: '1%',
            right: '40%',
            symbol: 'emptyCircle',
            symbolSize: 10,
            label: {
                normal: {
                    position: 'left',
                    verticalAlign: 'middle',
                    align: 'right',
                    fontSize: 14
                }
            },
            leaves: {
                label: {
                    normal: {
                        position: 'right',
                        verticalAlign: 'middle',
                        align: 'left'
                    }
                }
            },
            initialTreeDepth: 3,
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
        }]
    });
    pythonChart.on('click', function(params) {
        var name = params.data.name;
        var value = params.data.value;
        var url = params.data.url;
        clickNode(name, value, url);
    });
});
var frontChart = echarts.init(document.getElementById('frontend'));
frontChart.showLoading();
$.get('/json-data/frontend.json',
function(data) {
    frontChart.hideLoading();
    echarts.util.each(data.children,
    function(datum, index) {
        index % 2 === 0 && (datum.collapsed = true);
    });
    frontChart.setOption(option = {
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series: [{
            type: 'tree',
            data: transData(data, 'value', 'sj', 'children'),
            top: '1%',
            left: '120px',
            bottom: '1%',
            right: '40%',
            symbolSize: 10,
            label: {
                normal: {
                    position: 'left',
                    verticalAlign: 'middle',
                    align: 'right',
                    fontSize: 14
                }
            },
            leaves: {
                label: {
                    normal: {
                        position: 'right',
                        verticalAlign: 'middle',
                        align: 'left'
                    }
                }
            },
            initialTreeDepth: 3,
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
        }]
    });
    frontChart.on('click',
    function(params) {
        var name = params.data.name;
        var value = params.data.value;
        var url = params.data.url;
        clickNode(name, value, url);
    });
});
</script>
