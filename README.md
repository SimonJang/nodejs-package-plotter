# nodejs-package-plotter
Sandbox to test, benchmark nodejs packages and plot the results

## GNU plot fun

http://www.gnuplot.info/docs_5.2/Gnuplot_5.2.pdf

### How to create a plot from the CSV data?

```
gnuplot
set datafile separator ';'
plot source/retry-timers.csv with points
```