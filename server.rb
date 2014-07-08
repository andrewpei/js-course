require 'sinatra'
require 'sinatra/reloader'
require 'pry-byebug'

set :bind, '0.0.0.0'

get '/' do
  send_file 'index.html'
end
