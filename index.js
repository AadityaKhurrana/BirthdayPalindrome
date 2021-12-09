function reverseStr(str)
{
    // var listOfChar=str.split('');
    // var reversedList=listOfChar.reverse();
    // var reversed=reversedList.join();
    // return reversed;
    return str.split('').reverse().join('');
}
function isPaillindrome(data)
{
    var revStr=reverseStr(data);
    if(data===revStr)
    {
         return true;
    }
    else
    {
        return false;
    }
}
function convertDateToString(date)
{
    var dateStr={
        day:'',
        month:'',
        year:''
    };
    if(date.day<10)
    {
        dateStr.day='0'+date.day;
    }
    else
    {
        dateStr.day=date.day.toString();
    }

    if(date.month<10)
    {
        dateStr.month='0'+date.month;
    }
    else
    {
        dateStr.month=date.month.toString();
    }

    dateStr.year=date.year.toString();
    return dateStr;
}
function getAllDateFormats(date)
{ 
    var datestr=convertDateToString(date);
    var ddmmyyyy=datestr.day+datestr.month+datestr.year;
    var mmddyyyy=datestr.month+datestr.day+datestr.year;
    var yyyymmdd=datestr.year+datestr.month+datestr.day;
    var ddmmyy=datestr.day+datestr.month+datestr.year.slice(-2);
    var mmddyy=datestr.month+datestr.day+datestr.year.slice(-2);
    var yymmdd=datestr.year.slice(-2)+datestr.month+datestr.day;

    return [ddmmyyyy, mmddyyyy , yyyymmdd , ddmmyy , mmddyy , yymmdd ];
}
function checkPallindromeForAll(date)
{
    var list=getAllDateFormats(date);
    var isPallin=false;
    for(var i=0;i<list.length;i++)
    {
        if(isPaillindrome(list[i]))
        {
            isPallin=true;
            break;
        }
    }
    return isPallin;
}

function leapYear(year)
{
    if(year%400===0)
    {
        return true;
    }
    if(year%100===0)
    {
        return false;
    }
    if(year%4===0)
    {
        return true;
    }
    return false;
}

function getNextDate(date)
{
    var day=date.day+1;
    var month=date.month;
    var year=date.year;

    var dayInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];
    if(month===2)
    {
        if(leapYear(year))
        {
            if(day>29)
            {
                day=1;
                month++;
            }
        }
        else
        {
            if(day>28)
            {
                day=1;
                month++;
            }
        }
    }
    else
    {
        if(day>dayInMonth[month-1])
        {
            day=1;
            month++;
        }
    }

    if(month>12)
    {
        month=1;
        year++;
    }

    return {
        day:day,
        month:month,
        year:year
    }
}

function getNextPalindromeDAte(date)
{
    var ctr=0;
    var nextDate=getNextDate(date);
    while(1)
    {
        ctr++;
        var isPalin=checkPallindromeForAll(nextDate);
        if(isPalin)
        {
            break;
        }
        nextDate=getNextDate(nextDate);
    }

    return [ctr,nextDate];
}

var dateInput=document.querySelector('#bday-input');
var showBtn=document.querySelector('#show-btn');
var res=document.querySelector('#result');

function clickHandler()
{
    var bdystr=dateInput.value;
    if(bdystr!='')
    {
        var listofdate=bdystr.split('-'); // getting month , day and year seprately
        var date={
            day:Number(listofdate[2]),
            month:Number(listofdate[1]),
            year:Number(listofdate[0])
        };

        var ispalndrome=checkPallindromeForAll(date);
        if(ispalndrome)
        {
            res.innerText="It's Palindrome";
        }
        else
        {
            var [ctr, nextDate]=getNextPalindromeDAte(date);
            res.innerText='The next Palindrome date is '+nextDate.day+'-'+nextDate.month+'-'+nextDate.year+
            " you missed it by "+ctr+" days!";
        }
    }

}


showBtn.addEventListener('click',clickHandler);
