# Require any additional compass plugins here.

# Set this to the root of your project when deployed:
http_path = "/"
sass_dir = "sass"
javascripts_dir = "js"
css_dir = "css"
fonts_dir = css_dir + "/font"
images_dir = css_dir + "/img"
generated_images_dir = images_dir + "/generated"

# Require any additional compass plugins installed on your system.
require 'compass'
require 'susy'
require 'breakpoint'
require 'autoprefixer-rails'
# require 'sass-globbing'
require 'oily_png'

# require 'toolkit'

## Add support for repeating gradients
Compass::BrowserSupport.add_support('repeating-linear-gradient', 'webkit', 'moz', 'o', 'ms')
Compass::BrowserSupport.add_support('repeating-radial-gradient', 'webkit', 'moz', 'o', 'ms')

# Turn on support for FireSASS
firesass = false

# Change this to :production when ready to deploy the CSS to the live server. Otherwise :development.
environment = :production

# Default to development if environment is not set.
saved = environment
if (environment.nil?)
  environment = :development
else
  environment = saved
end

# You can select your preferred output style here (:expanded, :nested, :compact
# or :compressed).
output_style = (environment == :development) ? :expanded : :compressed

# To enable relative paths to assets via compass helper functions. Since Drupal
# themes can be installed in multiple locations, we don't need to worry about
# the absolute path to the theme from the server omega.
relative_assets = true

asset_cache_buster :none

# Conditionally enable line comments when in development mode.
line_comments = (environment == :production) ? false : false

# Output debugging info in development mode.
sass_options = (environment == :production) ? {} : {:debug_info => false}

# Make a copy of sprites with a name that has no uniqueness of the hash.
on_sprite_saved do |filename|
  if File.exists?(filename)
    FileUtils.cp filename, filename.gsub(%r{-s[a-z0-9]{10}\.png$}, '.png')
  end
end

# Replace in stylesheets generated references to sprites
# by their counterparts without the hash uniqueness.
on_stylesheet_saved do |filename|
  if File.exists?(filename)
    css = File.read filename
    File.open(filename, 'w+') do |f|
      f << css.gsub(%r{-s[a-z0-9]{10}\.png}, '.png')
    end
  end
end

on_stylesheet_saved do |file|
  css = File.read(file)
  File.open(file, 'w') do |io|
    io << AutoprefixerRails.process(css, browsers: [
      'last 6 Chrome versions',
      'last 6 Firefox versions',
      'last 4 iOS versions',
      'last 4 Safari versions',
      'Explorer >= 9',
      'last 5 Opera versions',
      'Android >= 4'
      ])
  end
end