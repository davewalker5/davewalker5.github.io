#!/usr/bin/env bash

if (( $# != 1 )); then
    scriptname=$(basename -- "$0")
    echo Usage: $scriptname OUTPUT-FILE-PATH
    exit 1
fi

OUTPUT="${1:-posts.csv}"

ruby - "$OUTPUT" <<'RUBY'
require "yaml"
require "csv"
require "date"

output = ARGV[0]

posts = Dir.glob("_posts/**/*.md").sort_by do |file|
  File.basename(file)[/\A\d{4}-\d{2}-\d{2}/]
end.reverse

CSV.open(
  output,
  "w",
  write_headers: true,
  headers: ["date", "title", "tags"]
) do |csv|

  posts.each do |file|
    content = File.read(file, encoding: "UTF-8")

    # Extract YAML front matter
    next unless content =~ /\A---\s*\n(.*?)\n---\s*\n/m

    front_matter = YAML.safe_load(
      $1,
      permitted_classes: [Date, Time],
      aliases: true
    ) || {}

    title = front_matter["title"].to_s
    title = title.gsub(/\s+/, " ").strip

    tags = front_matter["tags"]

    tags =
      case tags
      when Array
        tags.join(", ")
      when nil
        ""
      else
        tags.to_s
      end

    filename = File.basename(file)
    date = filename[/\A\d{4}-\d{2}-\d{2}/]

    csv << [date, title, tags]
  end
end

puts "Created #{output}"
RUBY