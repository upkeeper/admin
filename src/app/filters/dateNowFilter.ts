(function() {
    angular.module('Upkeeper')
        .filter('dateNow', () => {
            return input => {
                var now: any = moment().format();
                var then: any = moment(input).format();
                var diff: any = moment.duration(moment(then).diff(moment(now)));

                var days = parseInt(diff.asDays());
                days = days * -1;

                var hours = parseInt(diff.asHours());
                hours = hours - days * 24;
                hours = hours * -1;

                var minutes = parseInt(diff.asMinutes());
                var minusminutes = (days * 24 * 60 + hours * 60);
                minutes = minutes * -1;

                var secs = parseInt(diff.asSeconds());
                secs = secs - (minusminutes + minutes * 60);
                secs = secs * -1;

                if (days > 100)
                    return '';
                if (days === 0) {
                    if (hours === 0) {
                        if (minutes === 0) {
                            return secs + '  s';
                        }
                        minutes = minutes * -1;

                        return minutes + ' m' + secs + ' s';
                    }
                    hours = hours * -1;
                    minutes = minutes * -1;
                    // secs = secs * -1;
                    return hours + 'h ' + minutes + 'm ' + secs + 's ';
                }
                var final = days + ' d';

                return final;
            }
        })
})();